import { FibonacciHeap } from '@tyriar/fibonacci-heap';
import { BorderStyle, RouteStyle, Territory } from '../territory';
import { GuildMap } from '../guild_map';


class Node {
  territory: Territory;
  conns: string[];
  distance: number;
  parent: Node | null;

  constructor(territory: Territory, distance: number, conns: string[], parent: Node | null) {
    this.territory = territory;
    this.distance = distance;
    this.conns = conns;
    this.parent = parent;
  }

  Tag(): string {
    return this.territory.name;
  }

  Key(): number {
    return this.distance;
  }
}

export class Pathfinder {
  root: Territory;
  guildMap: GuildMap;

  constructor(root: Territory, guildMap: GuildMap) {
    this.root = root;
    this.guildMap = guildMap;
  }

  djikstra(target: Territory, style: RouteStyle): [Map<string, number>, Map<string, string>, Map<string, Territory>] {
    const visited: Map<string, boolean> = new Map();
    const nodes: Map<string, Territory> = new Map();
    const distances: Map<string, number> = new Map();
    const previous: Map<string, string> = new Map();
    const root: string = this.root.name;
    const nodesMap: Map<string, Node> = new Map();

    this.guildMap.territories.forEach((e: Territory) => {
      nodesMap.set(e.name, new Node(e, Number.POSITIVE_INFINITY, e.connections, null));
      distances.set(e.name, Number.MAX_SAFE_INTEGER);
      nodes.set(e.name, e);
    });

    nodesMap.set(root, new Node(this.root, 0, this.root.connections, null));
    distances.set(root, 0);

    const heap = new FibonacciHeap<number, Node>();
    heap.insert(0, nodesMap.get(root)!);

    while (!heap.isEmpty()) {
      const minimum = heap.extractMinimum();
      if (!minimum) break;
      const tag = minimum.value!.Tag();

      if (visited.get(tag)) {
        continue;
      }
      visited.set(tag, true);

      const fromNode = nodesMap.get(tag)!;
      fromNode.territory.connections.forEach((conn: string) => {
        if (!visited.get(conn)) {
          var edgeWeight = 1;
          let territory = nodes.get(conn);
          let territoryGuild = territory!.claim!.guild;
          let rootTerritory = this.root.claim!.guild;
          if(territoryGuild.tag !== rootTerritory.tag) {
            if(territory?.borders === BorderStyle.CLOSED) {
              edgeWeight += 999999
            } else if(style === RouteStyle.CHEAPEST) {
              if(territoryGuild.allies.includes(root)) {
                edgeWeight += territory!.allyTax;
              } else {
                edgeWeight += territory!.tax;
              }
            }
          }
          const toNode = nodesMap.get(conn)!;
          const newDistance = distances.get(fromNode.territory.name)! + edgeWeight;
          if (newDistance < distances.get(conn)!) {
            toNode.distance = fromNode.distance + edgeWeight;
            toNode.parent = fromNode;
            distances.set(conn, newDistance);
            previous.set(conn, fromNode.territory.name);
            heap.insert(toNode.distance, toNode);
          }
        }
      });
    }

    return [distances, previous, nodes];
  }

  route(target: Territory, style: RouteStyle): [Territory[], number, boolean]  {
    const [_, previous, nodes] = this.djikstra(target, style);
    const path: Territory[] = [];
    let tax = 0;
    let currentNode: string | undefined = previous.get(target.name);
    let rootTerritory = this.root.claim!.guild;
    let possible = true;
    while (currentNode && currentNode !== this.root.name) {
      let currentTerritory = nodes.get(currentNode)!
      let territoryGuild = currentTerritory.claim!.guild
      if(territoryGuild.tag !== rootTerritory.tag) {
        if(currentTerritory!.borders === BorderStyle.CLOSED) {
          possible = false;
        } else {
          if(territoryGuild.allies.includes(rootTerritory.tag)) {
            tax += currentTerritory!.allyTax;
          } else {
            tax += currentTerritory!.tax;
          }
        }
      }
      path.push(nodes.get(currentNode)!);
      currentNode = previous.get(currentNode);
    }
    return [path.reverse(), tax, possible];
  }

  getDistance(target: Territory): number {
    const [distance, previous, _] = this.djikstra(target, RouteStyle.FASTEST);
    return distance.get(target.name)!;
  }
}



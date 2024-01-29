<template>
  <div>
    <TabGroup>
      <TabList>
        <Tab>Territory Bonuses</Tab>
        <Tab>Territory Upgrades</Tab>
        <Tab>Guild</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
        
<script lang="ts">
import { Guild } from '../../ecoengine/guild';
import { Territory } from '../../ecoengine/territory';
import { TabPanel, TabList, TabGroup } from '@headlessui/vue'

export default {
  name: 'TerritoryPanel',
  props: {
    territory: Territory
  },
  setup(props) {

  },
  components: {}
}
</script>
        
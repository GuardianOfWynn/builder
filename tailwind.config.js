module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      fontFamily: {
        minecraft: "Minecraft",
        inter: "Inter, sans-serif"
      },
      colors: {
        'mc-dark-blue': "#0000AA",
        'mc-dark-green': "#00AA00",
        'mc-dark-aqua': "#00AAAA",
        'mc-dark-red': "#AA0000",
        'mc-dark-purple': "#AA00AA",
        'mc-gold': "#FFAA00",
        'mc-gray': "#AAAAAA",
        'mc-dark-gray': "#555555",
        'mc-blue': "#5555FF",
        'mc-lime': "#55FF55",
        'mc-aqua': "#55FFFF",
        'mc-red': "#FF5555",
        'mc-light-purple': "#FF55FF",
        'mc-yellow': "#FFFF55",
        'mc-bg': "#1A0E1A"
      },
      backgroundPosition: {
        'scroll': '-64px -192px',
        'food': '-448px -704px',
        'potion': '-1088px -384px',
        'ring': '-304px -370px',
        'necklace': '-124px -367px',
        'bracelet': '-0px -60px',
        'helmet': '-178px -0px',
        'chestplate': '-178px -60px',
        'leggings': '-178px -120px',
        'boots': '-178px -180px',
        'crafter': '-288px -0px',
        'builder': '-224px -0px',
        'workspace': '-288px -352px'
      },
      backgroundImage: {
        'spear': "url('/sprites/spear.webp')",
        'dagger': "url('/sprites/dagger.webp')",
        'wand': "url('/sprites/wand.webp')",
        'bow': "url('/sprites/bow.webp')",
        'relik': "url('/sprites/relik.webp')",
        'professions': "url('/sprites/ProfessionIcon.png')",
        'professions-dec': "url('/sprites/ProfessionIconDec.webp')",
        'wynn-icons': "url('/sprites/WynnIcons.png')",
        'accessories': "url('/sprites/AccessorySprites.gif')",
        'armours': "url('/sprites/ArmourSprites.png')",
        'ability-tree': "url('/sprites/abilitytree/ability_page_no_border.png')",
        'wynn-map': "url('/maps/map.png')",
        'map11': "url('/maps/1_1.png')",
        'map21': "url('/maps/2_1.png')",
        'map22': "url('/maps/2_2.png')",
        'map23': "url('/maps/2_3.png')",
        'map31': "url('/maps/3_1.png')",
        'map32': "url('/maps/3_2.png')",
        'map33': "url('/maps/3_3.png')",
        'map41': "url('/maps/4_1.png')",
        'map42': "url('/maps/4_2.png')",
        'map43': "url('/maps/4_3.png')",
        'map51': "url('/maps/5_1.png')",
        'map52': "url('/maps/5_2.png')",
        'map53': "url('/maps/5_3.png')",
        'map61': "url('/maps/6_1.png')",
        'map62': "url('/maps/6_2.png')",
        'map63': "url('/maps/6_3.png')",
        'map71': "url('/maps/7_1.png')",
        'map72': "url('/maps/7_2.png')",
        'map73': "url('/maps/7_3.png')"
      },
      borderImage: {
        'ability-tree': "url('/sprites/abilitytree/ability_page.svg')"
      }
     },
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }
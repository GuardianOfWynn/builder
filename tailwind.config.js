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
        'boots': '-178px -180px'
      },
      backgroundImage: {
        'professions': "url('/sprites/ProfessionIcon.png')",
        'wynn-icons': "url('/sprites/WynnIcons.png')",
        'accessories': "url('/sprites/AccessorySprites.gif')",
        'armours': "url('/sprites/ArmourSprites.png')"
      }
     },
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }
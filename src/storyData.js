// src/storyData.js

export const FACTIONS = {
    MIGHT: 'MIGHT',       // Red: Steel, Earth, Cosmic
    TRICKERY: 'TRICKERY', // Purple: Shadow, Illusion, Death
    MAGIC: 'MAGIC'        // Blue: Storm, Radiance, Forest
};

export const storyChapter = {
  ender: {
    name: 'Path of Shadows',
    faction: FACTIONS.TRICKERY,
    monsters: [
      { name: 'Dark_Rat', art: '/art/enemies/Dark_Rat.webp', faction: FACTIONS.TRICKERY },
      { name: 'Shadow_Hound', art: '/art/enemies/Shadow_Hound.webp', faction: FACTIONS.TRICKERY },
      { name: 'Night_Reaper', art: '/art/enemies/Night_Reaper.webp', faction: FACTIONS.TRICKERY },
    ],
    miniBoss: { name: 'Umbral_Knight_Commander', art: '/art/enemies/Umbral_Knight_Commander.webp', faction: FACTIONS.TRICKERY },
    boss: { name: 'Ender', art: '/art/routes/Ender.webp', faction: FACTIONS.TRICKERY },
  },
  gamma: {
    name: 'Path of Stone',
    faction: FACTIONS.MIGHT,
    monsters: [
        { name: 'Stone_Imp', art: '/art/enemies/Stone_Imp.webp', faction: FACTIONS.MIGHT },
        { name: 'Rockback_Boar', art: '/art/enemies/Rockback_Boar.webp', faction: FACTIONS.MIGHT },
        { name: 'Crystal_Rhino', art: '/art/enemies/Crystal_Rhino.webp', faction: FACTIONS.MIGHT },
    ],
    miniBoss: { name: 'Colossus_Titan', art: '/art/enemies/Colossus_Titan.webp', faction: FACTIONS.MIGHT },
    boss: { name: 'Gamma', art: '/art/routes/Gamma.webp', faction: FACTIONS.MIGHT },
  },
  razortail: {
      name: 'Path of Steel',
      faction: FACTIONS.MIGHT,
      monsters: [
          { name: 'Iron_Ratling', art: '/art/enemies/Iron_Ratling.webp', faction: FACTIONS.MIGHT },
          { name: 'Steel_Wolf', art: '/art/enemies/Steel_Wolf.webp', faction: FACTIONS.MIGHT },
          { name: 'Blade_Golem', art: '/art/enemies/Blade_Golem.webp', faction: FACTIONS.MIGHT },
      ],
      miniBoss: { name: 'War_Machine_Juggernaut', art: '/art/enemies/War_Machine_Juggernaut.webp', faction: FACTIONS.MIGHT },
      boss: { name: 'Razortail', art: '/art/routes/Razortail.webp', faction: FACTIONS.MIGHT },
  },
  evergreen: {
      name: 'Path of the Forest',
      faction: FACTIONS.MAGIC,
      monsters: [
          { name: 'Vine_Serpent', art: '/art/enemies/Vine_Serpent.webp', faction: FACTIONS.MAGIC },
          { name: 'Spore_Bear', art: '/art/enemies/Spore_Bear.webp', faction: FACTIONS.MAGIC },
          { name: 'Ancient_Treant_Warrior', art: '/art/enemies/Ancient_Treant_Warrior.webp', faction: FACTIONS.MAGIC },
      ],
      miniBoss: { name: 'Greatwood_Guardian', art: '/art/enemies/Greatwood_Guardian.webp', faction: FACTIONS.MAGIC },
      boss: { name: 'Evergreen', art: '/art/routes/Evergreen.webp', faction: FACTIONS.MAGIC },
  },
  oryu: {
      name: 'Path of Radiance',
      faction: FACTIONS.MAGIC,
      monsters: [
          { name: 'Golden_Hawk', art: '/art/enemies/Golden_Hawk.webp', faction: FACTIONS.MAGIC },
          { name: 'Sun_Stag', art: '/art/enemies/Sun_Stag.webp', faction: FACTIONS.MAGIC },
          { name: 'Radiant_Knight', art: '/art/enemies/Radiant_Knight.webp', faction: FACTIONS.MAGIC },
      ],
      miniBoss: { name: 'Seraph_Judge', art: '/art/enemies/Seraph_Judge.webp', faction: FACTIONS.MAGIC },
      boss: { name: 'Oryu', art: '/art/routes/Oryu.webp', faction: FACTIONS.MAGIC },
  },
  chrome: {
      name: 'Path of the Storm',
      faction: FACTIONS.MAGIC,
      monsters: [
          { name: 'Storm_Crow', art: '/art/enemies/Storm_Crow.webp', faction: FACTIONS.MAGIC },
          { name: 'Thunder_Lizard', art: '/art/enemies/Thunder_Lizard.webp', faction: FACTIONS.MAGIC },
          { name: 'Cyclone_Djinn', art: '/art/enemies/Cyclone_Djinn.webp', faction: FACTIONS.MAGIC },
      ],
      miniBoss: { name: 'Tempest_Colossus', art: '/art/enemies/Tempest_Colossus.webp', faction: FACTIONS.MAGIC },
      boss: { name: 'Chrome', art: '/art/routes/Chrome.webp', faction: FACTIONS.MAGIC },
  },
  escalon: {
      name: 'Path of Illusion',
      faction: FACTIONS.TRICKERY,
      monsters: [
          { name: 'Trickster_Goblin', art: '/art/enemies/Trickster_Goblin.webp', faction: FACTIONS.TRICKERY },
          { name: 'Mirror_Stalker', art: '/art/enemies/Mirror_Stalker.webp', faction: FACTIONS.TRICKERY },
          { name: 'Dream_Hunter', art: '/art/enemies/Dream_Hunter.webp', faction: FACTIONS.TRICKERY },
      ],
      miniBoss: { name: 'Vision_Warlock', art: '/art/enemies/Vision_Warlock.webp', faction: FACTIONS.TRICKERY },
      boss: { name: 'Escalon', art: '/art/routes/Escalon.webp', faction: FACTIONS.TRICKERY },
  },
  fresia: {
      name: 'Path of the Cosmos',
      faction: FACTIONS.MIGHT,
      monsters: [
          { name: 'Falling_Starling', art: '/art/enemies/Falling_Starling.webp', faction: FACTIONS.MIGHT },
          { name: 'Meteor_Brute', art: '/art/enemies/Meteor_Brute.webp', faction: FACTIONS.MIGHT },
          { name: 'Astral_Serpent', art: '/art/enemies/Astral_Serpent.webp', faction: FACTIONS.MIGHT },
      ],
      miniBoss: { name: 'Void_Sentinel', art: '/art/enemies/Void_Sentinel.webp', faction: FACTIONS.MIGHT },
      boss: { name: 'Fresia', art: '/art/routes/Fresia.webp', faction: FACTIONS.MIGHT },
  },
  specter: {
      name: 'Path of the Underworld',
      faction: FACTIONS.TRICKERY,
      monsters: [
          { name: 'Bone_Hound', art: '/art/enemies/Bone_Hound.webp', faction: FACTIONS.TRICKERY },
          { name: 'Wailing_Ghoul', art: '/art/enemies/Wailing_Ghoul.webp', faction: FACTIONS.TRICKERY },
          { name: 'Death_Knight', art: '/art/enemies/Death_Knight.webp', faction: FACTIONS.TRICKERY },
      ],
      miniBoss: { name: 'Herald_of_the_Underworld', art: '/art/enemies/Herald_of_the_Underworld.webp', faction: FACTIONS.TRICKERY },
      boss: { name: 'Specter', art: '/art/routes/Specter.webp', faction: FACTIONS.TRICKERY },
  },
};

export const ALL_ARTIFACTS = [
  { id: 'charm_of_life', name: 'Charm of Life', description: 'เริ่ม run ด้วย +1 HP (จบ run หาย)', price: 50, imagePath: '/art/artifacts/Charm_of_Life.webp' },
  { id: 'second_wind', name: 'Second Wind', description: 'ตายครั้งแรกใน run ฟื้น HP ครึ่งนึง แล้วลุยต่อ (ใช้แล้วหาย)', price: 80, imagePath: '/art/artifacts/Second_Wind.webp' },
  { id: 'lucky_coin', name: 'Lucky Coin', description: 'หีบแสดงตัวเลือกเพิ่ม +1 ตัวเลือก (จบ run หาย)', price: 35, imagePath: '/art/artifacts/Lucky_Coin.webp' },
  { id: 'training_scroll', name: 'Training Scroll', description: 'อัปเกรดการ์ด 1 ใบ ทำให้เลขเพิ่ม +1 (ใช้ได้ครั้งเดียว)', price: 40, imagePath: '/art/artifacts/Training_Scroll.webp' },
  { id: 'granite_charm', name: 'Granite Charm', description: 'บล็อกดาเมจครั้งแรกที่โดน 1 ครั้งในแต่ละด่าน (จบ run หาย)', price: 60, imagePath: '/art/artifacts/Granite_Charm.webp' },
  { id: 'brooch_of_edge', name: 'Brooch of Edge', description: 'เมื่อแต้มรวมชนะมีโอกาส 20% ทำดาเมจเพิ่ม +1 (จบ run หาย)', price: 60, imagePath: '/art/artifacts/Brooch_of_Edge.webp' },
  { id: 'healers_leaf', name: 'Healer’s Leaf', description: 'เมื่อชนะการต่อสู้ ฟื้น +1 HP (จบ run หาย)', price: 30, imagePath: '/art/artifacts/Healers_Leaf.webp' },
  { id: 'reroll_key', name: 'Reroll Key', description: 'ในหีบ, สุ่มรายการใหม่ได้ 1 ครั้ง (ใช้แล้วหาย)', price: 20, imagePath: '/art/artifacts/Reroll_Key.webp' },
  { id: 'wide_sleeve', name: 'Wide Sleeve', description: 'สุ่มดูการ์ดที่ศัตรูวาง 1 ใบ (ใช้แล้วหาย)', price: 60, imagePath: '/art/artifacts/Wide_Sleeve.webp' },
  { id: 'merchants_pouch', name: 'Merchant’s Pouch', description: 'ได้รับทองเพิ่มเมื่อชนะ (จบ run หาย)', price: 30, imagePath: '/art/artifacts/Merchants_Pouch.webp' },
];

// src/storyData.js

export const storyChapter = {
  ender: {
    name: 'Path of Shadows',
    monsters: [
      { name: 'Dark_Rat', art: '/art/enemies/Dark_Rat.png' },
      { name: 'Shadow_Hound', art: '/art/enemies/Shadow_Hound.png' },
      { name: 'Night_Reaper', art: '/art/enemies/Night_Reaper.png' },
    ],
    miniBoss: { name: 'Umbral_Knight_Commander', art: '/art/enemies/Umbral_Knight_Commander.png' },
    boss: { name: 'Ender', art: '/art/routes/Ender.png' },
  },
  gamma: {
    name: 'Path of Stone',
    monsters: [
        { name: 'Stone_Imp', art: '/art/enemies/Stone_Imp.png' },
        { name: 'Rockback_Boar', art: '/art/enemies/Rockback_Boar.png' },
        { name: 'Crystal_Rhino', art: '/art/enemies/Crystal_Rhino.png' },
    ],
    miniBoss: { name: 'Colossus_Titan', art: '/art/enemies/Colossus_Titan.png' },
    boss: { name: 'Gamma', art: '/art/routes/Gamma.png' },
  },
  razortail: {
      name: 'Path of Steel',
      monsters: [
          { name: 'Iron_Ratling', art: '/art/enemies/Iron_Ratling.png' },
          { name: 'Steel_Wolf', art: '/art/enemies/Steel_Wolf.png' },
          { name: 'Blade_Golem', art: '/art/enemies/Blade_Golem.png' },
      ],
      miniBoss: { name: 'War_Machine_Juggernaut', art: '/art/enemies/War_Machine_Juggernaut.png' },
      boss: { name: 'Razortail', art: '/art/routes/Razortail.png' },
  },
  evergreen: {
      name: 'Path of the Forest',
      monsters: [
          { name: 'Vine_Serpent', art: '/art/enemies/Vine_Serpent.png' },
          { name: 'Spore_Bear', art: '/art/enemies/Spore_Bear.png' },
          { name: 'Ancient_Treant_Warrior', art: '/art/enemies/Ancient_Treant_Warrior.png' },
      ],
      miniBoss: { name: 'Greatwood_Guardian', art: '/art/enemies/Greatwood_Guardian.png' },
      boss: { name: 'Evergreen', art: '/art/routes/Evergreen.png' },
  },
  oryu: {
      name: 'Path of Radiance',
      monsters: [
          { name: 'Golden_Hawk', art: '/art/enemies/Golden_Hawk.png' },
          { name: 'Sun_Stag', art: '/art/enemies/Sun_Stag.png' },
          { name: 'Radiant_Knight', art: '/art/enemies/Radiant_Knight.png' },
      ],
      miniBoss: { name: 'Seraph_Judge', art: '/art/enemies/Seraph_Judge.png' },
      boss: { name: 'Oryu', art: '/art/routes/Oryu.png' },
  },
  chrome: {
      name: 'Path of the Storm',
      monsters: [
          { name: 'Storm_Crow', art: '/art/enemies/Storm_Crow.png' },
          { name: 'Thunder_Lizard', art: '/art/enemies/Thunder_Lizard.png' },
          { name: 'Cyclone_Djinn', art: '/art/enemies/Cyclone_Djinn.png' },
      ],
      miniBoss: { name: 'Tempest_Colossus', art: '/art/enemies/Tempest_Colossus.png' },
      boss: { name: 'Chrome', art: '/art/routes/Chrome.png' },
  },
  escalon: {
      name: 'Path of Illusion',
      monsters: [
          { name: 'Trickster_Goblin', art: '/art/enemies/Trickster_Goblin.png' },
          { name: 'Mirror_Stalker', art: '/art/enemies/Mirror_Stalker.png' },
          { name: 'Dream_Hunter', art: '/art/enemies/Dream_Hunter.png' },
      ],
      miniBoss: { name: 'Vision_Warlock', art: '/art/enemies/Vision_Warlock.png' },
      boss: { name: 'Escalon', art: '/art/routes/Escalon.png' },
  },
  fresia: {
      name: 'Path of the Cosmos',
      monsters: [
          { name: 'Falling_Starling', art: '/art/enemies/Falling_Starling.png' },
          { name: 'Meteor_Brute', art: '/art/enemies/Meteor_Brute.png' },
          { name: 'Astral_Serpent', art: '/art/enemies/Astral_Serpent.png' },
      ],
      miniBoss: { name: 'Void_Sentinel', art: '/art/enemies/Void_Sentinel.png' },
      boss: { name: 'Fresia', art: '/art/routes/Fresia.png' },
  },
  specter: {
      name: 'Path of the Underworld',
      monsters: [
          { name: 'Bone_Hound', art: '/art/enemies/Bone_Hound.png' },
          { name: 'Wailing_Ghoul', art: '/art/enemies/Wailing_Ghoul.png' },
          { name: 'Death_Knight', art: '/art/enemies/Death_Knight.png' },
      ],
      miniBoss: { name: 'Herald_of_the_Underworld', art: '/art/enemies/Herald_of_the_Underworld.png' },
      boss: { name: 'Specter', art: '/art/routes/Specter.png' },
  },
};

export const ALL_ARTIFACTS = [
  { id: 'charm_of_life', name: 'Charm of Life', description: 'เริ่ม run ด้วย +1 HP (จบ run หาย)', price: 50, imagePath: '/art/artifacts/Charm_of_Life.png' },
  { id: 'second_wind', name: 'Second Wind', description: 'ตายครั้งแรกใน run ฟื้น HP ครึ่งนึง แล้วลุยต่อ (ใช้แล้วหาย)', price: 80, imagePath: '/art/artifacts/Second_Wind.png' },
  { id: 'lucky_coin', name: 'Lucky Coin', description: 'หีบแสดงตัวเลือกเพิ่ม +1 ตัวเลือก (จบ run หาย)', price: 35, imagePath: '/art/artifacts/Lucky_Coin.png' },
  { id: 'training_scroll', name: 'Training Scroll', description: 'อัปเกรดการ์ด 1 ใบ ทำให้เลขเพิ่ม +1 (ใช้ได้ครั้งเดียว)', price: 40, imagePath: '/art/artifacts/Training_Scroll.png' },
  { id: 'granite_charm', name: 'Granite Charm', description: 'บล็อกดาเมจครั้งแรกที่โดน 1 ครั้งในแต่ละด่าน (จบ run หาย)', price: 60, imagePath: '/art/artifacts/Granite_Charm.png' },
  { id: 'brooch_of_edge', name: 'Brooch of Edge', description: 'เมื่อแต้มรวมชนะมีโอกาส 20% ทำดาเมจเพิ่ม +1 (จบ run หาย)', price: 60, imagePath: '/art/artifacts/Brooch_of_Edge.png' },
  { id: 'healers_leaf', name: 'Healer’s Leaf', description: 'เมื่อชนะการต่อสู้ ฟื้น +1 HP (จบ run หาย)', price: 30, imagePath: '/art/artifacts/Healers_Leaf.png' },
  { id: 'reroll_key', name: 'Reroll Key', description: 'ในหีบ, สุ่มรายการใหม่ได้ 1 ครั้ง (ใช้แล้วหาย)', price: 20, imagePath: '/art/artifacts/Reroll_Key.png' },
  { id: 'wide_sleeve', name: 'Wide Sleeve', description: 'สุ่มดูการ์ดที่ศัตรูวาง 1 ใบ (ใช้แล้วหาย)', price: 60, imagePath: '/art/artifacts/Wide_Sleeve.png' },
  { id: 'merchants_pouch', name: 'Merchant’s Pouch', description: 'ได้รับทองเพิ่มเมื่อชนะ (จบ run หาย)', price: 30, imagePath: '/art/artifacts/Merchants_Pouch.png' },
];

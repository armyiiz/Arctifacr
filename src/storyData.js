// src/storyData.js

export const storyChapter = {
  ender: {
    name: 'Path of Shadows',
    monsters: [
      { name: 'Dark_Rat', art: 'Dark_Rat' },
      { name: 'Shadow_Hound', art: 'Shadow_Hound' },
      { name: 'Night_Reaper', art: 'Night_Reaper' },
    ],
    miniBoss: { name: 'Umbral_Knight_Commander', art: 'Umbral_Knight_Commander' },
    boss: { name: 'Ender', art: 'Ender' },
  },
  gamma: {
    name: 'Path of Stone',
    monsters: [
        { name: 'Stone_Imp', art: 'Stone_Imp' },
        { name: 'Rockback_Boar', art: 'Rockback_Boar' },
        { name: 'Crystal_Rhino', art: 'Crystal_Rhino' },
    ],
    miniBoss: { name: 'Colossus_Titan', art: 'Colossus_Titan' },
    boss: { name: 'Gamma', art: 'Gamma' },
  },
  razortail: {
      name: 'Path of Steel',
      monsters: [
          { name: 'Iron_Ratling', art: 'Iron_Ratling' },
          { name: 'Steel_Wolf', art: 'Steel_Wolf' },
          { name: 'Blade_Golem', art: 'Blade_Golem' },
      ],
      miniBoss: { name: 'War_Machine_Juggernaut', art: 'War_Machine_Juggernaut' },
      boss: { name: 'Razortail', art: 'Razortail' },
  },
  evergreen: {
      name: 'Path of the Forest',
      monsters: [
          { name: 'Vine_Serpent', art: 'Vine_Serpent' },
          { name: 'Spore_Bear', art: 'Spore_Bear' },
          { name: 'Ancient_Treant_Warrior', art: 'Ancient_Treant_Warrior' },
      ],
      miniBoss: { name: 'Greatwood_Guardian', art: 'Greatwood_Guardian' },
      boss: { name: 'Evergreen', art: 'Evergreen' },
  },
  oryu: {
      name: 'Path of Radiance',
      monsters: [
          { name: 'Golden_Hawk', art: 'Golden_Hawk' },
          { name: 'Sun_Stag', art: 'Sun_Stag' },
          { name: 'Radiant_Knight', art: 'Radiant_Knight' },
      ],
      miniBoss: { name: 'Seraph_Judge', art: 'Seraph_Judge' },
      boss: { name: 'Oryu', art: 'Oryu' },
  },
  chrome: {
      name: 'Path of the Storm',
      monsters: [
          { name: 'Storm_Crow', art: 'Storm_Crow' },
          { name: 'Thunder_Lizard', art: 'Thunder_Lizard' },
          { name: 'Cyclone_Djinn', art: 'Cyclone_Djinn' },
      ],
      miniBoss: { name: 'Tempest_Colossus', art: 'Tempest_Colossus' },
      boss: { name: 'Chrome', art: 'Chrome' },
  },
  escalon: {
      name: 'Path of Illusion',
      monsters: [
          { name: 'Trickster_Goblin', art: 'Trickster_Goblin' },
          { name: 'Mirror_Stalker', art: 'Mirror_Stalker' },
          { name: 'Dream_Hunter', art: 'Dream_Hunter' },
      ],
      miniBoss: { name: 'Vision_Warlock', art: 'Vision_Warlock' },
      boss: { name: 'Escalon', art: 'Escalon' },
  },
  fresia: {
      name: 'Path of the Cosmos',
      monsters: [
          { name: 'Falling_Starling', art: 'Falling_Starling' },
          { name: 'Meteor_Brute', art: 'Meteor_Brute' },
          { name: 'Astral_Serpent', art: 'Astral_Serpent' },
      ],
      miniBoss: { name: 'Void_Sentinel', art: 'Void_Sentinel' },
      boss: { name: 'Fresia', art: 'Fresia' },
  },
  specter: {
      name: 'Path of the Underworld',
      monsters: [
          { name: 'Bone_Hound', art: 'Bone_Hound' },
          { name: 'Wailing_Ghoul', art: 'Wailing_Ghoul' },
          { name: 'Death_Knight', art: 'Death_Knight' },
      ],
      miniBoss: { name: 'Herald_of_the_Underworld', art: 'Herald_of_the_Underworld' },
      boss: { name: 'Specter', art: 'Specter' },
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

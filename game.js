// ================== VARIABEL DASAR ==================
let player = {
  health: 100,
  hunger: 100,
  thirst: 100,
  stamina: 100,
  inventory: [],
  day: 1,
  godMode: false
};

let world = {
  weather: "Cerah",
  npcs: []
};

let gameLog = document.getElementById("game-log");

// ================== FUNGSI UTAMA ==================
function updateUI() {
  document.getElementById("health").textContent = player.health;
  document.getElementById("hunger").textContent = player.hunger;
  document.getElementById("thirst").textContent = player.thirst;
  document.getElementById("stamina").textContent = player.stamina;
  document.getElementById("weather").textContent = world.weather;
  document.getElementById("day").textContent = player.day;
}

function log(msg) {
  gameLog.innerHTML += "<br>" + msg;
  gameLog.scrollTop = gameLog.scrollHeight;
}

// ================== AKSI ==================
function explore() {
  log("Kamu menjelajah hutan...");
  let event = Math.random();
  if(event < 0.3) {
    log("Kamu menemukan buah liar 🍌");
    player.inventory.push("Buah");
  } else if(event < 0.6) {
    log("Seekor NPC musuh muncul! ⚔️");
    spawnEnemy();
  } else {
    log("Kamu berjalan tanpa menemukan apa-apa.");
  }
  updateUI();
}

function eat() {
  if(player.inventory.includes("Buah")) {
    player.hunger = Math.min(player.hunger + 20, 100);
    player.inventory.splice(player.inventory.indexOf("Buah"), 1);
    log("Kamu memakan buah 🍌");
  } else {
    log("Tidak ada makanan di inventory!");
  }
  updateUI();
}

function drink() {
  if(player.inventory.includes("Air")) {
    player.thirst = Math.min(player.thirst + 20, 100);
    player.inventory.splice(player.inventory.indexOf("Air"), 1);
    log("Kamu meminum air 💧");
  } else {
    log("Tidak ada air di inventory!");
  }
  updateUI();
}

function rest() {
  player.stamina = 100;
  player.day++;
  log("Kamu beristirahat dan hari berganti...");
  updateUI();
}

function craft() {
  log("⚒️ Kamu mencoba membuat sesuatu...");
  if(player.inventory.includes("Kayu") && player.inventory.includes("Batu")) {
    log("Kamu membuat kapak 🪓");
    player.inventory.push("Kapak");
    player.inventory.splice(player.inventory.indexOf("Kayu"),1);
    player.inventory.splice(player.inventory.indexOf("Batu"),1);
  } else {
    log("Bahan tidak cukup!");
  }
}

// ================== NPC AI ==================
function spawnEnemy() {
  let npc = { type: "enemy", hp: 30 };
  world.npcs.push(npc);
  log("NPC musuh menyerang! ❤️" + npc.hp);
}

function spawnFriend() {
  let npc = { type: "friend", hp: 50 };
  world.npcs.push(npc);
  log("NPC teman muncul untuk membantu!");
}

// ================== CHEAT SYSTEM ==================
function unlockCheat() {
  let code = document.getElementById("cheat-code").value;
  if(code === "DRAKS@1122") {
    document.getElementById("cheat-menu").classList.remove("hidden");
    log("🔓 Cheat Mode aktif!");
  } else {
    log("❌ Kode salah!");
  }
}

function cheat_addResources() {
  player.inventory.push("Kayu","Batu","Air","Buah");
  log("Cheat: Resource ditambahkan!");
}

function cheat_godMode() {
  player.godMode = !player.godMode;
  log("Cheat: God Mode " + (player.godMode ? "ON" : "OFF"));
}

function cheat_spawnNPC() {
  spawnFriend();
  log("Cheat: NPC teman muncul!");
}

function cheat_skipDay() {
  player.day += 5;
  log("Cheat: Skip 5 hari!");
  updateUI();
}

// ================== UPDATE ==================
setInterval(() => {
  if(!player.godMode) {
    player.hunger -= 1;
    player.thirst -= 1;
    if(player.hunger <= 0 || player.thirst <= 0) {
      player.health -= 5;
    }
  }
  if(player.health <= 0) {
    log("💀 Kamu mati...");
    clearInterval();
  }
  updateUI();
}, 3000);

updateUI();

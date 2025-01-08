let shop = false;
function shopOpen(){
  shop = true
}


let Clicker = {
    Attack: 0,
    upgrades: {
      Attack_Machines: {
        amount: 0,
        cost: 25,
        APS: 1,
        hasun: false,
        unlocked: 10,
        name: "Stabing"
      },
      Attack_Machine: {
        amount: 0,
        cost: 50,
        APS: 2.5,
        hasun: false,
        unlocked: 30,
        name: "Reposting"
      },
      Attack_Cool: {
        amount: 0,
        cost: 100,
        APS: 5,
        hasun: false,
        unlocked: 75,
        name: "Parrying"
      },
      Attack_cool: {
        amount: 0,
        cost: 200,
        APS: 10,
        hasun: false,
        unlocked: 150,
        name: "Counter 6 and 4"
      },
      Attack_coo: {
        amount: 0,
        cost: 750,
        APS: 25,
        hasun: false,
        unlocked: 400,
        name: "Lunging"
      },
      Attack_ool: {
        amount: 0,
        cost: 2500,
        APS: 75,
        hasun: false,
        unlocked: 1500,
        name: "Dodging"
      },
      Attack_oool: {
        amount: 0,
        cost: 3250,
        APS: 100,
        hasun: false,
        unlocked: 2750,
        name: "Thrusting"
      },
      Attack_soool: {
        amount: 0,
        cost: 5000,
        APS: 150,
        hasun: false,
        unlocked: 3000,
        name: "Sweeping"
      },
      Attack_nool: {
        amount: 0,
        cost: 7500,
        APS: 200,
        hasun: false,
        unlocked: 7000,
        name: "Blocking"
      },
      Attack_nice: {
        amount: 0,
        cost: 9375,
        APS: 250,
        hasun: false,
        unlocked: 9000,
        name: "Feinting"
      },
      Attack_11: {
        amount: 0,
        cost: 18750,
        APS: 500,
        hasun: false,
        unlocked: 17500,
        name: 'Half-Swording'
      },
    },
    acheivs: [{
      req: "Clicker.Attack>0",
      gotten: false,
      text: "You Have 1 Attack"
    }, {
      req: "Clicker.Attack>9",
      gotten: false,
      text: "You Have 10 Attack"
    }, {
      req: "Clicker.Attack>49",
      gotten: false,
      text: "You Have 50 Attack"
    }, {
      req: "Clicker.Attack>99",
      gotten: false,
      text: "You Have 100 Attack"
    }, {
      req: "Clicker.Attack>24",
      gotten: false,
      text: "You Have 25 Attack"
    }, {
      req: "Clicker.Attack>74",
      gotten: false,
      text: "You Have 75 Attack"
    }, {
      req: "Clicker.Attack>149",
      gotten: false,
      text: "You Have 150 Attack"
    }, {
      req: "Clicker.Attack>199",
      gotten: false,
      text: "You Have 200 Attack"
    }, {
      req: "Clicker.Attack>499",
      gotten: false,
      text: "You Have 500 Attack"
    }, {
      req: "Clicker.Attack>999",
      gotten: false,
      text: "You Have 1000 Attack"
    },]
  }
 
  let delay = 0
  let APS = 0
 
  function thing_clicked(thing) {
    if (Clicker.upgrades[thing].cost <= Clicker.Attack) {
      Clicker.Attack -= Clicker.upgrades[thing].cost
      Clicker.upgrades[thing].amount++
      Clicker.upgrades[thing].cost += Math.round(Clicker.upgrades[thing].cost * 0.25)
      update_upgrades();
    }
  }
 
  function update_upgrades() {
    if (shop){
      document.querySelector('#upgrades').innerHTML = "";
      let d = 0
      for (i in Clicker.upgrades) {
        if (Clicker.upgrades[i].hasun) {
          document.querySelector('#upgrades').innerHTML += `<br> <button onclick="thing_clicked('${i}'); Aps()">Practice ${Clicker.upgrades[i].name}</button> 
          You have Practiced ${Clicker.upgrades[i].name} ${numberformat.format(Clicker.upgrades[i].amount)} times. It gives ${numberformat.format(Clicker.upgrades[i].APS)} APS per upgrade. 
          You get ${numberformat.format(Clicker.upgrades[i].amount * Clicker.upgrades[i].APS)} APS From ${Clicker.upgrades[i].name}. Cost: ${numberformat.format(Clicker.upgrades[i].cost)} <br>`;
          d += Clicker.upgrades[i].APS * Clicker.upgrades[i].amount
        }
     
    }
    APS = d
    }
  }
 
  function updatecount() {
    update_upgrades()
    if (Cookies.get("Clicker") != null && Cookies.get("Clicker") != "undifined") {
      let Clicker1 = JSON.parse(Cookies.get("Clicker"))
      for (i in Clicker.upgrades) {
        if (Clicker1.upgrades[i] == null) {
          Clicker1.upgrades[i] = Clicker.upgrades[i]
        }
      }
      Clicker = Clicker1
      for (i in Clicker.acheivs) {
        if (Clicker1.acheivs[i] == null || Clicker.acheivs[i].text != Clicker1.acheivs[i].text) {
          Clicker1.acheivs[i] = Clicker.acheivs[i]
        }
      }
      Clicker = Clicker1
    }
    update_upgrades()
    if (Cookies.get("lasttime") != null) {
      let lastsavedate = Number(Cookies.get("lasttime"))
      lastsavedate = Date.now() - lastsavedate
      lastsavedate = Math.round(lastsavedate / 1000)
      if (lastsavedate / 60 >= 1) {
        Clicker.Attack += lastsavedate * APS / 1.8
        document.querySelector("#acheivs").innerHTML = `<br> While You Were Gone ...<br> You gained ${numberformat.format(lastsavedate * APS / 1.8)} Attack Levels`
      }
    }
    setInterval(() => {
      for (i in Clicker.upgrades) {
        Clicker.Attack += Clicker.upgrades[i].amount * Clicker.upgrades[i].APS / 20
      }
      for (i in Clicker.acheivs) {
        let b = new Function('return ' + Clicker.acheivs[i].req)
        if (b() && !Clicker.acheivs[i].gotten) {
          Clicker.acheivs[i].gotten = true
          document.querySelector("#acheivs").innerHTML += `<br>ACHEIVMENT UNLOCKED<br>${Clicker.acheivs[i].text}`
        }
      }
      document.querySelector("#Attack").innerHTML = "Your Attack Level is " + numberformat.format(Number(String(Clicker.Attack).split(".")[0]))
      for (i in Clicker.upgrades) {
        if (!Clicker.upgrades[i].hasun && Clicker.upgrades[i].unlocked <= Clicker.Attack) {
          if(shop){
            Clicker.upgrades[i].hasun = true
          update_upgrades()
          }
        }
      }
      delay++
      if (delay >= 40) {
        Cookies.set("Clicker", JSON.stringify(Clicker), {
          expires: 100000
        })
        Cookies.set("lasttime", Date.now(), {
          expires: 100000
        })
        delay = 0
      }
    }, 50);
  }
 
  function Rickrolled() {
    document.querySelector("#rick").innerHTML = "You Got Rick Rolled"
  }
  function Aps() {
    document.querySelector("#aps").innerHTML = "APS: " + numberformat.format(Math.round(APS))
  }


  function hideOnShop() {
    let x = document.querySelector("#upgrades");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
    let y = document.querySelector("#aps");
    if (y.style.display === "none") {
      y.style.display = "block";
    } else {
      y.style.display = "none";
    }
    let z = document.querySelector("#title");
    if (z.style.display === "none") {
      z.style.display = "block";
    } else {
      z.style.display = "none";
    }
    let a = document.querySelector("#acheivs");
    if (a.style.display === "none") {
      a.style.display = "block";
    } else {
      a.style.display = "none";
    }
    let b = document.querySelector("#Rick");
    if (b.style.display === "none") {
      b.style.display = "block";
    } else {
      b.style.display = "none";
    }
    let c = document.querySelector("#sources");
    if (c.style.display === "none") {
      c.style.display = "block";
    } else {
      c.style.display = "none";
    }
    let d = document.querySelector("#pass");
    if (d.style.display === "none") {
      d.style.display = "block";
    } else {
      d.style.display = "none";
    }
  }


  function checkPswd() {
    let confirmPassword = "chat";
    let password = document.getElementById("pswd").value;
    if (password == confirmPassword) {
        devHacks()


    }
    else{
        alert("Passwords do not match.");
    }
  }


  function devHacks(){
    // Change Title
    document.querySelector("#title").innerHTML = "Dev Hacks";
    // Hide Password Bar
    document.querySelector("#pass").innerHTML='';
    //Change Attack
    Clicker.Attack += 1000000000000000000000000000000000
    // Hide More Attack and Sources
    document.querySelector("#Sources").innerHTML = '';
    document.querySelector("#Rick").innerHTML = '';
  }

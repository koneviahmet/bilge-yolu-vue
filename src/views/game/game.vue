<template>
      <div id="container">

          <div class="centerContainer flex h-full w-full">
              <div class="w-full h-full">
                  <Left 
                    :start='start' 
                    :newGame='newGame' 
                    :game='game' 
                    :messages='getMessages()'
                    :zarDurumu='zarDurumu'
                    :selectGamer='selectGamer'
                    :oynayanOyuncu='oynayanOyuncu'
                    :animIlerleme='animIlerleme'
                    />
              </div>
              <div class="w-full h-full">
                  <Right :colorList='colorList' :gamers='gamers' />
              </div>
          </div>

          <div class="block" v-for="(block, i) in blockList" :key="i">
                <div class="blockContent">
                    <!-- 
                    <img :src="'@/assets/images/home.png'" v-if="filterList(i).src">
                    -->
                    <!----> 
                    <div class="pullContent">
                        <div 
                            class="pull" 
                            v-for="(gamer, x) in gamersFilter(getSira(i))" 
                            :key="x" 
                            :style="{'top': 0.4 + 'vw','left':(x * 0.5) + 'vw', 'color':pulColor(gamer.pul).color, 'background':pulColor(x).background, 'border-color':pulColor(gamer.pul).border}"
                            >
                            {{gamer.pul}}
                        </div>
                    </div>
                     
                    <img :src="getSrc(block.index)" v-if="block.src">
                    <div class="blockTop"><!--{{getSira(i)}}--></div>
                    <div class="blockBottom" :class="block.text && block.class" v-if="block.text">{{block.text}}</div> 
                     
                </div>
          </div>
      </div>
</template>

<script>
import Left from './left.vue'
import Right from './right.vue'
import dataJson from './data.json';
import colorJson from './color.json';

export default {
  name: 'App',
  data() {
      return {
          newSira: [14,13,12,11,10,9,8,7,6,5,4,3,2,1,15,36,16,35,17,34,18,33,19,20,21,22,23,24,25,26,27,28,29,30,31,32],
          blockSize: 36,
          maxIlerleme: 8,
          animIlerleme: null, //ilerleme için animasyon yapıcak 1 / 2 / 3 / 4 vs..
          aciklama: {},
          game: false,
          oynayanOyuncu: 1,
          zarDurumu: false,
          blockList: [...dataJson],
          colorList: [...colorJson],
          oyuncuAdedi: null,
          oyuncuAdediMax: 50,
          oyuncuAdediMin: 2,
          gamers: [],
          messages: []
      }
  },
  components: {
    Left,
    Right,
  },
  methods: {
        newGame(){
            this.game               = false;
            this.zarDurumu          = false;
            this.oyuncuAdedi        = null;
            this.animIlerleme       = null;
            this.oynayanOyuncu      = 1;
            this.gamers             = [];
            this.messages           = [];
        },
        filterList(i){
            return this.blockList.filter(item => item.index == i)[0];
        },
        getSrc(i){
            return `./images/${this.filterList(i).src}`;
        },
        pulColor(i){
            let kalan = parseInt(i) % this.colorList.length;
            return this.colorList[kalan];
        },
        gamersFilter(sira){
            return this.gamers.filter(i => i.sira == sira);
        },
        getSira(index){
            return this.newSira[index];
        },
        start(oyuncuAdedi){
            if(!oyuncuAdedi){
                alert("Oyuncu adedi girmelisiniz.");
            }else{
                let intOyuncuAdedi = parseInt(oyuncuAdedi);
                if(intOyuncuAdedi < this.oyuncuAdediMin || oyuncuAdedi > this.oyuncuAdediMax){
                    alert(this.oyuncuAdediMin+"-"+this.oyuncuAdediMax + " arasında oyuncu girebilirsiniz.")
                }else{
                    this.messages = ["İlk oyuncuyu seçerek oyuna başlayabilirsiniz."];
                    this.game = true;
                    this.oyuncuAdedi = intOyuncuAdedi;
                    this.createNewGame();
                }
            }
            
        },
        createNewGame(){
            let newGamers = [];
            for(let i=0; i < this.oyuncuAdedi; i++){
                newGamers.push({
                  pul: i + 1,
                  sira: 0,
                  started: false
                })
            }

            this.gamers = [...newGamers];
        },
        getMessages(){
            let newStartMessages = [
                '<strong>Oyuna başlamadan önce dikkatlice okuyunuz.</strong>',
                'Öğrencilerden <strong>bir kişiyi</strong> akıllı tahtaya <strong>bir kişiyide</strong> kasanın başına seçiniz ve diğer kalan öğrenci sayısını aşşağıdaki texte yazınız.',
                'Oyun ile ilgili kartları <a class="text-red-800 font-bold" href="#quesitons">buradan</a> indirebilirsiniz. ',
                'Sınıf mevcudunuz çok ise oyunun daha verimli olması için üçer kişilik gruplar kurmanızı tavsiye ederiz.',
                'Başaşrılar.'
            ];

            return this.game && this.messages || newStartMessages;
        },
        selectGamer(){
            this.zarDurumu = true;
            this.getAnimIlerleme();
        },
        setOynayanOyuncu(){
            if(this.oynayanOyuncu == this.oyuncuAdedi){
                this.oynayanOyuncu = 1;
            }else{
                this.oynayanOyuncu += 1;
            }
            
        },
        getAnimIlerleme(){
            this.animIlerleme = this.getRandomIlerleme();
            let i = 0;
            let selectInterval = setInterval(() => {
                i++;
                this.animIlerleme = this.getRandomIlerleme(); 

                if(i == 12){
                    this.next(this.animIlerleme);
                    clearInterval(selectInterval);
                }
            }, 300); // 300
            
        },
        getRandomIlerleme(){
            return Math.floor(Math.random() * this.maxIlerleme) + 1;  
        },
        next(newIlerlemeMiktari){
            /* ilerleme miktarını seçtik */
            //this.gamers[this.oynayanOyuncu - 1].sira += newIlerlemeMiktari;
            this.messages = [];
            this.messages.push(this.gamers[this.oynayanOyuncu - 1].pul + " numaralı oyuncu");

            /* ilk oynamayı true yapalım */
            
            if(!this.gamers[this.oynayanOyuncu - 1].started){
                this.messages.push("Oyuna yeni başladığın için kasadan 500 tane puan al.");
                this.gamers[this.oynayanOyuncu - 1].started = true;
            }

            let i = 0;
            let nextInterval = setInterval(() => {
                i++;
                if(this.gamers[this.oynayanOyuncu - 1].sira == this.blockSize){
                    /* tur atmış demektir. */
                    this.gamers[this.oynayanOyuncu - 1].sira  = 1;

                    /* 1 tur döbmüş demektir demektir. */
                    this.messages.push("Oyunda bir tur attığın için kasadan 500 tane puan al.");
                }else{
                    this.gamers[this.oynayanOyuncu - 1].sira += 1;
                }
                

                if(i == newIlerlemeMiktari){
                    /* ilerleme durdu demektir. */

                    /* yeni oyunce seçmeyi aktif edelim */
                    this.zarDurumu  = false;

                    /* oyuncu bilgileri */
                    let gamerInfo   = this.gamers[this.oynayanOyuncu - 1];
                    
                    /* block bilgileri */
                    let blockInfo   = this.blockList.filter(i => i.index == this.newSira.indexOf(gamerInfo.sira) + 1)[0];

                    //gelen bloğun tipine göre bildirelim
                    this.typeAction(gamerInfo, blockInfo);

                    /* oyuncuyu 1 arttıralım */
                    this.setOynayanOyuncu();


                    clearInterval(nextInterval);
                }
            }, 500); //500

     
        },
        typeAction(gamerInfo, blockInfo){
            let blockIndex = parseInt(blockInfo.index) - 1;
            let gamerIndex = parseInt(gamerInfo.pul) - 1;

            if (blockInfo.type == "kasa"){

                /* kasanın sahibi var mı ona bakalım */
                if(!blockInfo.gamer){
                    //this.blokList[7].text = gamerInfo.pul + ". Oyuncu";
                    this.blockList[blockIndex].text = gamerInfo.pul + ". Oyuncu";
                    this.messages.push("Tebrikler artık bu kasanın sahibisin.");
                    this.blockList[blockIndex].gamer = gamerInfo.pul;
                    this.messages.push("Kutudan bir soru seç.");
                    this.messages.push("Soruyu doğru bilirsen <strong>kasadan</strong> sorunun üzerinde yazan kadar puan al, bilemezsen <strong>kasaya</strong>  kağıdın üzerinde yazan kadar puan ver.");

                }else{
                    this.messages.push("Kutudan bir soru seç.");
                    this.messages.push("Soruyu doğru bilirsen <strong>kasadan</strong> sorunun üzerinde yazan kadar puan al, bilemezsen <strong>"+this.blockList[blockIndex].gamer+". oyuncuya </strong>  kağıdın üzerinde yazan kadar puan ver.");
                }


            
            }else if(blockInfo.type == "carpi2"){
                this.messages.push("Şanslı Günündesin.");
                this.messages.push("Kutudan bir soru seç.");
                this.messages.push("Soruyu doğru bilirsen <strong>kasadan</strong> sorunun üzerinde yazan puan miktarının iki katını al, bilemezsen <strong>kasaya</strong>  kağıdın üzerinde yazan puan miktarını kasaya ver.");

            }else if(blockInfo.type == "carpi4"){
                this.messages.push("Süper Şanslı Günündesin :)");
                this.messages.push("Kutudan bir soru seç.");
                this.messages.push("Soruyu doğru bilirsen <strong>kasadan</strong> sorunun üzerinde yazan puan miktarının dört katını al, bilemezsen <strong>kasaya</strong>  kağıdın üzerinde yazan puan miktarını kasaya ver.");
    
            }else if(blockInfo.type == "home"){
                this.messages.push("İşler yolunda gitmiyor gibi.");
                this.messages.push("Başlangıç noktasına git ve sıranın tekrar sana gelmesini bekle.");

                this.gamers[gamerIndex].sira = 0;
            
            }else if(blockInfo.type == "soru"){
                this.messages.push("Kutudan bir soru seç.");
                this.messages.push("Soruyu doğru bilirsen <strong>kasadan</strong> sorunun üzerinde yazan kadar puan al, bilemezsen <strong>kasaya</strong>  kağıdın üzerinde yazan kadar puan ver.");

                
            }else if(blockInfo.type == "hediye"){
                this.messages.push("Tebrikler kasadan 100 puan kazandın.");

            }else if(blockInfo.type == "ates"){
                this.messages.push("Üzgünüm seni ateşten kurtarmam için kasaya 100 puan vermelisin. ");
            }



        }
        
        
  }
}
</script>



<style scoped>
#container{
    position: fixed;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template: 1fr 1fr 1fr 1fr 1fr 1fr / 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}

.pullContent{
    position: relative;
    width: 100%;
    height: 100%;
}

.pull{
    position: absolute;
    width: 2.4vw;;
    height: 2.4vw;;
    background: #9de6e8;
    border: solid 2px #73b9d7;
    color: #333;
    border-radius: 50%;
    text-align: center;
    font-size: 1.8vw;
}

.block{
    opacity: 0.9;
    overflow: hidden;
    position: relative;
    border: solid 1px #ccc; 
    background: #f1f1f1; 
    margin: 2px;
    font-size:  1.4vw;
}


.centerContainer{
    opacity: 1;
    background: none;
    border: none;
    grid-row: 2 / 6;
    grid-column: 2 / 14;
    display: flex;
    align-items: flex-end;
}


.centerContainer .left{
    flex: 1;
}


.centerContainer .right{
    flex: 1;
    width: 100%;
    height: 100%;
}



.blockContent{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

}

.blockContent img{
    width: 80%;
    position: absolute;
    bottom: -0.9vw;
    right: -0.9vw;
    opacity: .5;
}

.blockTop{
    flex: 3;
}

.blockBottom{
    background: blue;
    flex: 1;
    text-align: center;
    color:  #fff;
}

.red{
    background: #c93838;
}

.blue{
    background: #263859;
}

.green{
    background: #50CB93;
}

.yellow{
    background: #FFA900;
}
</style>
<template>
    <div class="w-full h-full flex items-end bg-white">
        <div class=" w-full" v-if="!zarDurumu">
            <div class="p-6">
                <ul class="list-disc">
                    <li v-for="(msg, key) in messages" :key="key" v-html="msg"></li>
                </ul>
            </div>
            <div class="leftInput" v-if="!game">
                <input class="input border-gray-600" type="text" placeholder="Sınıf Mevcudu" v-model="oyuncuAdedi"/>
            </div>

            <div class="p-4 flex space-x-4 items-end justify-end">
                <button class="btn btn-xl mr-2" v-if="!game" @click="start(oyuncuAdedi)">Başla</button>
                <button class="btn btn-xl mr-2" v-if="game" @click="selectGamer()">Sıradaki Oyuncu</button>
                <button class="btn btn-xl mr-2 hidden" v-if="game" @click="newGame()" hidden>Yeni Oyun</button>
            </div> 
        </div>

        <div class="w-full flex justify-around" v-if="zarDurumu">
            <div class="">
                <h4>Oynayan Oyuncu</h4>
                <div class="selectNumber">
                    {{ oynayanOyuncu }}
                </div>
            </div>
            <div class="">
                <h4>İlerleme Miktarı</h4>
                <div class="selectNumber">
                    {{animIlerleme}}
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Left',
    props: ['studentCount', 'oynayanOyuncu', 'animIlerleme'],
    data() {
        console.log(this.studentCount);
        return {
            oyuncuAdedi: this.studentCount
        }
    },
    props: {
        game: Boolean,
        zarDurumu: Boolean,
        start: Function,
        newGame: Function,
        selectGamer: Function,
        animIlerleme: Number,
        messages: Array,
        studentCount:Number,
        oynayanOyuncu:Number
    }
}
</script>

<style scoped>
.selectContent {
    margin: 0.4vw;
    border: solid 1px #ccc;
    border-radius: 5px;
    background: #fff;
    padding: 0.5vw;
    display: grid;
    grid-template: 1fr / 1fr 1fr;
}

.select{
    text-align: center;
    border: dashed 1px #ccc;
    margin: 0.2vw;
    padding: 0.2vw;
}

.leftContent {
    margin: 0.4vw;
    border: solid 1px #ccc;
    border-radius: 5px;
    background: #fff;
}


.leftCenter{
    font-size: 1.1vw;
    padding: 1.2vw;
    border-bottom: solid 1px #ccc;
}

.leftCenter ul{
    margin-left: 1vw;
    list-style: disc;
    line-height: 1.6vw;
}

.leftInput{
    font-size: 1.2vw;
    padding: 0.8vw;   
    border-bottom: solid 1px #ccc;
}

.leftInput input{
    width: 100%;
    padding: 0.4vw;
}

.leftFooter{
    overflow: hidden;
    font-size: 1.2vw;
    padding: 0.8vw;
}


.selectNumber{
    text-align: center;
    font-size: 4vw;
}



</style>
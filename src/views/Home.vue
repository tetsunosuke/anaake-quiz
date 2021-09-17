<template>
  <ion-page>
  <!-- この2つのヘッダーはあとで調べる-->
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>QUIZ</ion-title>
        <!--<p>TODO: TIMER</p> -->
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" class="vertical-center">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">QUIZ</ion-title>
        </ion-toolbar>
      </ion-header>
    
<ion-grid>
  <ion-row>
    <ion-col>
        <p>
        <span v-for="(char, index) in masked" :key="char.id" v-on:click="revealByIndex(index)">
            <span v-if="char == ''" v-bind:id="'pos' + index">？</span>
            <span v-if="char != ''" v-bind:id="'pos' + index">{{char}}</span>
        </span>
        </p>
    </ion-col>
  </ion-row>
  <ion-row>
    <ion-col>
        <aiueo v-on:revealByChar="revealByChar"/>
    </ion-col>
  </ion-row>
</ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import aiueo from './aiueo';

export default defineComponent({
  name: 'Home',
  components: {
    IonGrid,
    IonCol,
    IonRow,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    aiueo
  },
  data: function() {
      return {
          text: "",
          answer:"",
          masked: "",
          alphabets: "",
      }
  },
  computed: {
      maskedArray: {
          get: function() {
              return this.masked
          },
          set: function(v) {
              this.text = v
          }
      },
      answerArray: {
          get: function() {
              return this.answer
          },
          set: function(v) {
              this.text = v
          }
      }
  },
  ionViewDidEnter() {
      const text = "にほんでいちばんたかいやまはどこでしょう"
      this.generateQuestion(text)
  },
  setup() {
  },
  methods: {
      generateQuestion(text) {
        this.masked = this.mask(text);
        this.answer = this.splitAnswer(text);
        this.text = text;
        this.alphabets = this.generateAlphabets()
      },
      mask(text) {
          return new Array(text.length).fill("")
      },
      splitAnswer(text) {
          return text.split("")
      },
      revealByIndex(index) {
          // 選択した文字をオープンしてマスクを外す
          this.masked[index] = this.answer[index];
          // その他の場所で同じ文字があったらマスクを外す
          const result = this.getAllIndexes(this.answer, this.answer[index]).map((index) => {
              this.masked[index] = this.answer[index];
              return true
          });
          // TODO: resultが空だった場合該当なしを返す
          console.log(result);
      },
      revealByChar(char) {
          const result = this.getAllIndexes(this.answer, char).map((index) => {
              this.masked[index] = this.answer[index];
              return true
          });
          // TODO: resultが空だった場合該当なしを返す
          console.log(result);
      },
      getAllIndexes(arr, val) {
        let indexes = [], i = -1;
        // valが濁点だった場合を考慮して、arrもvalも50音に変換する
        val = this.normalize(val);
        arr = arr.map ( (char) => this.normalize(char) );
        while ((i = arr.indexOf(val, i+1)) != -1) {
            indexes.push(i);
        }
        return indexes;
      },
      normalize(char) {
          char = char.normalize("NFD")[0]
          const map = {
            "ぁ": "あ",
            "ぃ": "い",
            "ぅ": "う",
            "ぇ": "え",
            "ぉ": "お",
            "ゃ": "や",
            "ゅ": "ゆ",
            "ょ": "よ",
          };
          if (char in map) {
              char = map[char]
          }
          return char
      },
      generateAlphabets() {
          return "あいうえお"
               + "かきくけこ"
               + "さしすせそ"
               + "たちつてと"
               + "なにぬねの"
               + "はひふへほ"
               + "まみむめも"
               + "やゆよ"
               + "らりるれろ"
               + "わをん"
               + "ー".split("");
      }
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>

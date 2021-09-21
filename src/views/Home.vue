<template>
  <ion-page>
  <!-- この2つのヘッダーはあとで調べる-->
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>QUIZ めくった回数{{ revealCount }} <span v-if="hasNext" @click="next">next</span>
</ion-title>
        <!--<p>TODO: TIMER</p> -->
      </ion-toolbar>
    </ion-header>
  <ion-grid>
    <ion-row class="ion-align-items-center">
      <ion-col>
        <input id="inputAnswer" class="message"/>
      </ion-col>
    </ion-row>
    <ion-row class="ion-align-items-center">
      <ion-col>
          <p class="question">問題：
            <span v-for="(char, index) in masked" :key="char.id" v-on:click="revealByIndex(index)">
              <span v-if="char == ''" v-bind:id="'pos' + index">？</span>
              <span v-if="char != ''" v-bind:id="'pos' + index">{{char}}</span>
            </span>
          </p>
      </ion-col>
    </ion-row>
    <ion-row class="ion-align-items-center">
      <ion-col>
        <aiueo v-on:revealByChar="revealByChar"/>
      </ion-col>
    </ion-row>
    <ion-row class="ion-align-items-center">
      <ion-col>
        <p class="message">{{message}}</p>
      </ion-col>
    </ion-row>
    <ion-row class="ion-align-items-center">
      <ion-col>
        <ul>
          <li>ルール</li>
          <ul>
          <li>「？」の部分か50音表の文字をクリックすると、問題文の？の中で同じ文字がオープンします</li>
          <li>問題文を予想して答えを出すまでにめくった回数を競います</li>
          </ul>
          <li>まだ作ってない</li>
          <ul>
          <li>トータルで回答した回数</li>
          <li>タイマー</li>
          <li>答えの入力欄</li>
          </ul>
        </ul>
      </ion-col>
    </ion-row>

  </ion-grid>
  </ion-page>
</template>


<script>
import {
    IonGrid,
    IonRow,
    IonCol,
//    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import aiueo from './aiueo';
const axios = require('axios').default;


export default defineComponent({
  name: 'Home',
  components: {
    IonGrid,
    IonCol,
    IonRow,
    // IonContent,
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
          masked: "ただいま問題を読み込んでいます......",
          alphabets: "",
          revealCount: 0, // めくった回数
          message:"",
      }
  },
  computed: {
      hasNext: {
          get: function() {
              const state = this.$store.state;
              if (state.json === undefined) {
                  return false;
              }
              if (Object.keys(state.json).length === state.count + 1) {
                  return false;
              }
              return true;
          },
      },
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
  ionViewWillEnter() {
      console.log("ionViewWillEnter");
      this.fetchQuestions().then( (questions) => {
        // storeに入れて描画
        this.generateQuestion(questions[0].question)
        this.$store.commit("saveJson", this.shuffle(questions));
      }).catch( (error) => {
          console.error(error);
      });
  },
  ionViewWillLeave() {
      console.log("ionViewWillLeave");
  },
  ionViewDidLeave() {
      console.log("ionViewDidLeave");
  },
  ionViewDidEnter() {
      console.log("ionViewDidEnter");
  },
  setup() {
  },
  methods: {
      shuffle(base) {
          let array = [...base];
          for (let i = array.length; 1 < i; i--) {
              const k = Math.floor(Math.random() * i);
              [array[k], array[i - 1]] = [array[i - 1], array[k]];
          }
          return array;
      },
      next() {
          this.$store.commit("increment")
          this.masked = ""
          this.revealCount = 0;
          this.generateQuestion(
            this.getItem().question
          );
      },
      getItem() {
          return this.$store.state.json[this.$store.state.count];
      },
      async fetchQuestions() {
          const url = "https://script.google.com/macros/s/AKfycbwJG0SGHC8vZARry8LMOwVDoQ_rmYCFNLO9UmnG8yFu5NkPa2A5JpeGsAhNsF2NfWkGrQ/exec";
          return await axios.get(url).then( v => v.data);
      },
      generateQuestion(text) {
        this.masked = this.mask(text)
        this.answer = this.splitAnswer(text)
        this.text = text
        this.alphabets = this.generateAlphabets()
        this.revealDefault()
      },
      mask(text) {
          return new Array(text.length).fill("")
      },
      splitAnswer(text) {
          return text.split("")
      },
      addRevealCount() {
          if (this.revealCount === undefined) {
              this.revealCount = 0;
          }
          this.revealCount++;
      },
      setRevealCount(cnt) {
          this.revealCount = cnt;
      },
      revealByIndex(index) {
          this.addRevealCount();
          // 選択した文字をオープンしてマスクを外す
          this.masked[index] = this.answer[index];
          // その他の場所で同じ文字があったらマスクを外す
          this.getAllIndexes(this.answer, this.answer[index]).map((index) => {
              this.masked[index] = this.answer[index];
              return true
          });
      },
      revealByChar(char) {
          this.addRevealCount();
          const result = this.getAllIndexes(this.answer, char).map((index) => {
              this.masked[index] = this.answer[index];
              return true
          });
          if (result.length === 0) {
              this.message = "該当なし";
          } else {
              this.message = "パネルをめくります";
          }
      },
      revealDefault() {
          const ignoreChars = ["「", "」", "　", "、", "・"];
          ignoreChars.map( c => {
              this.getAllIndexes(this.answer, c).map((index) => {
                this.masked[index] = this.answer[index];
                return true
            });
          });
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
.message { font-size:30; text-align:center; color: #F00}
input.message { 
    width:100%;     padding: 0;
    line-height: 28px;
    height: 30px;}
</style>

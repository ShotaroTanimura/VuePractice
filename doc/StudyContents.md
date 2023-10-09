# Vue の学習

### 特徴

学習コストが低い
高性能
柔軟性がある

### 学習環境

Version 3.1.5
google crome
vscode
mergely

- web サービスの差分を調べるツール [Mergely 公式サイト](https://editor.mergely.com/)

### VueJS の使用方法

1. Vue の読み込み
   今回は CDN を使用する

- CDN
  - HTML ファイルの最後の body タグの直前に下記を記載
  ```html
  <script src="https://unpkg.com/vue@next"></script>
  <!-- @nextは最新版 -->
  <!-- 今回はVersionを統一するために3.1.5を使用。 -->
  <script src="https://unpkg.com/vue@3.1.5"></script>
  ```
- 直接読み込み
- Vue CLI

2. Vue のインスタンスの作成
   JS ファイルに下記を記述

```javascript
const app = Vue.createApp({
  //各種設定
});
```

3. HTML 内で Vue を適用する要素の指定

```html
<div id="app"></div>
```

```javascript
const app = Vue.createApp({
  //各種設定
});
app.mount('#app');
```

- mount メソッドを使用することで VueJS が構築した DOM に置き換わる
  **DOM とは**
  DOM は「Document Object Model」の略で、ウェブページの構造を表現するためのプログラムインターフェイス（API）です。DOM を使うことで、JS のプログラムから HTML や XML ドキュメントの内容や構造を読み取ったり、変更したりすることができます。

### データバインディングをしてみよう

**データバインディングとは**
自動的な更新: ソースデータが変更されたとき、それに連動してUIが自動的に更新される仕組み。
例えば input ボックスに文字入力すると画面上でテキストなどがリアルタイムで変わる仕組み

- data オプションを使用して使用するデータを宣言
- 今回は message プロパティを使用する

```javascript
const app = Vue.createApp({
  data: () => ({
    message: 'Hello world',
  }),
});
app.mount('#app');
```

- 定義した message プロパティをマスタッシュを使用して参照する
- マスタッシュは二重の中括弧 {{}}

```html
<div id="app">
  <p>{{message}}</p>
</div>
```

#### 色々なプロパティを定義して参照してみよう

ケース：配列

```javascript
const app = Vue.createApp({
  data: () => ({
    message: 'Hello world',
    name: ['Tom','Nike','Mike']
  }),
});
app.mount('#app');
```

```html
<div id="app">
  <p>{{message}}</p>
  <!-- Tomの表示   -->
  <p>{{name[0]}}</p> 
</div>
```

### ディレクティブについて
Vue.jsに何らかの指示を行う命令
#### 属性へのデータバインディング
**v-bind:**
エラー：inputタグの中に値を入れたいときvalueの中にマスタッシュ構文を書く
正解：v-bindを利用してプロパティを設定する

```javascript
const app = Vue.createApp({
  data: () => ({
    message: 'Hello world',
  }),
});
app.mount('#app');
```
```html
<div id="app">
  <input type="text" v-bind:value="message">
</div>
```
#### 条件分岐
表示/非表示の切り替えに便利
boolプロパティの中がtrueなら表示、falseなら非表示
**v-if**
```javascript
const app = Vue.createApp({
  data: () => ({
    bool: true,
  }),
});
app.mount('#app');
```
```html
<div id="app">
  <p v-if ="bool">good morning</p>
</div>
```
#### 繰り返し描画したいとき
**v-forを使用する**
```javascript
const app = Vue.createApp({
  data: () => ({
    names: ["A","B","C"]
  }),
});
app.mount('#app');
```
```html
<div id="app">
  <ol>
    <li v-for = "name in names">{{name}}</li>
    <!-- v-for = "in"はJSのループ処理の方法の一つと捉えればよい -->
  </ol>
</div>
```
#### オブジェクトを繰り返し描画したいとき
**v-forを使用する**
```javascript
const app = Vue.createApp({
  data: () => ({
    user: {
      name: "yamada",
      hobby: "soccer",
      age: "20"
    }
  }),
});
app.mount('#app');
```
```html
<div id="app">
  <ol>
    <li v-for = "value in user">{{value}}</li>
  </ol>
  <!-- keyとvalueを取得したいとき -->
  <ul>
    <li v-for = "(value, key) in user">{{key}}:{{value}}</li>
  </ul>
</div>
```
##### Just-Do-It-Time
**問題に挑戦しよう**
1. 問題1 オブジェクトの中のオブジェクトの中身を表示してみよう
```javascript
const app = Vue.createApp({
  data: () => ({
    users: [{
      id: 1,
      name: "a",
      age: 10
    },
    {
      id: 2,
      name: "b",
      age: 20
    },
    {
      id: 3,
      name: "c",
      age: 30
    }]
  }),
});
app.mount('#app');
```

### イベント処理をしよう
ボタンを押したら表示する
**v-onディレクティブ**
記述方法：v-on:イベント名 = "メソッド名"
メソッドはmethodsオプションに記入する
```javascript
const app = Vue.createApp({
  data: () => ({
    click: "now",
  }),
  methods:{
    onClick: function(){
      this.click = new Date().toLocaleString()
    }
  }
  
});
app.mount('#app');
```
```html
<div id="app">
  <button v-on:click = "onClick">click</button>
  <p>{{click}}</p>
</div>
```

#### thisについて

メソッド内の `this` は、基本的には「自分が属しているオブジェクト」を指します。

例を見てみましょう。

```javascript
const dog = {
    name: 'ポチ',
    bark: function() {
        console.log(this.name + 'がワンワンと吠える！');
    }
};

dog.bark(); // "ポチがワンワンと吠える！"
```

この例での `dog.bark` メソッドの中の `this` は、`dog` オブジェクトを指します。そのため、`this.name` は `dog` オブジェクトの `name` プロパティ、つまり "ポチ" を指しています。

簡単に言えば、メソッド内の `this` は「そのメソッドが属しているオブジェクト」を指す、と考えるとわかりやすいでしょう。
---
### 双方向データバインディング
オブジェクトの値を変えると、HTMLの中身が変わることに加え、HTMLの中身を変えるとオブジェクトの中身が変わる。
**v-model**
```javascript
const app = Vue.createApp({
  data: ()=>({
    changeMessage: "name"
  })
  
});
app.mount('#app');
```
```html
<div id="app">
  <p><input type="text" v-model="changeMessage"></p>
  <h2>{{changeMessage}}</h2>
</div>
```

### コンポーネントについて
Vue内でhtmlに記述するひな形のようなものを作っておく
名前付きの再利用可能なインスタンス（UI部品）
**Vue.component('コンポーネント名', コンポーネント情報)**
```javascript
const app = Vue.createApp({
  data: ()=>({
  })
  
});
app.component('component-name',{
  template: '<p>My name is TTT</p>'
})
app.mount('#app');
```
```html
<div id="app">
  <component-name></component-name>
</div>
```

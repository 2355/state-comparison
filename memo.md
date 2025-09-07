## 目的
- zustand を使ってみたい
- jotai との違い
- 使うべきタイミング
- 比較しやすいサンプルアプリ

## zustand について知っていること
- redux ににているらしい
- 中央集権型状態管理ライブラリっぽい
- ので、jotai より複雑なユースケースに向いているっぽい
  - 複数の状態が連動するようなケース

## zustand について知らないこと
- 具体的にどう書くの？
- 実際の手触り
- 結局使い所は？

## ディレクトリ構成 
```
state-comparison/
  app/
    zustand/
      todo/
        page.tsx
      cart/
        page.tsx
    jotai/
      todo/
        page.tsx
      cart/
        page.tsx
    layout.tsx
    page.tsx           # トップページ（説明やリンク置き場）
  components/
    Todo/
      TodoList.tsx
      AddTodoForm.tsx
    Cart/
      CartList.tsx
      CartSummary.tsx
  stores/
    zustand/
      todoStore.ts
      cartStore.ts
    jotai/
      todoAtoms.ts
      cartAtoms.ts
  lib/
    fakeApi.ts         # ダミーAPI

```

## zustand 疑問
- `[ todos, addTodo, toggleTodo ] = useTodoStore()` みたいに、状態とアクションをまとめてエクスポートできない？
- コンポーネントをまたいで同じ値を使っているわけではないので、それぞれのコンポーネントの内部で useTodoStore() を呼べばいいんじゃないのか？

## jotai 疑問
- setter atom は操作単位で生成する？
- atom 宣言するだけで `const [todos, setTodos] = useAtom(todosAtom)` 的に生成されるわけではない？
- 基本的にそれぞれ atom を export するより、まとめて export した方が実用は良さそう？
- Provider の使い所は？ state の生存期間は？
  - Provider が アンマウントされると state は破棄されて初期値に戻る
  - SPA の場合、アプリ全体に 1 つの Provider をラップしている場合、ページ遷移しても Jotai の state は保持される
  - サーバを経由した画面遷移では state はリセットされる
    - state はクライアントサイドで生成されるため
  - アプリ全体で共通の state を持ちたいなら、Provider はルート (_app.tsx や layout.tsx) に置くのがベスト
  - Provider を置かない → デフォルトのグローバル store に紐づく
    - そのため、普通にページをまたいでも状態は保持される
    - 状態をコンテキスト単位で分けたいときに Provider を使う

## 気になる差分
- テスト時のモックはどうなる？
- zustand vs jotai でそれぞれが優れているパターン？
  - 階層の深いコンポーネント？
  - いろんな箇所で使われる state ?
  - ピタゴラスイッチ的に連鎖する state ?
- 宣言の仕方だけ違って、使う側は同じに見える

## テストの書き味
- zustand ではそれぞれ使う場所で setState するのが良さそう
- jotai だと createStore するので testWrapper を作るのが良さそう
- zustand のほうがだいぶ書き味良いかも

## グローバルステート管理ライブラリの使い方
- 画面をまたいだ状態管理は普通のユースケース
- 実は Jotai には jotai/utils の [atomWithStorage](https://jotai.org/) という仕組みがあって、 localStorage や sessionStorage と連動した state を簡単に作れます。
  ```ts
  import { atomWithStorage } from 'jotai/utils';

  const themeAtom = atomWithStorage('theme', 'light');
  ```
- 「アプリ内で一時的に共有したい情報」→ Jotai
- 「リロード後も残したい情報」→ localStorage / DB 連携
- 両方必要なら atomWithStorage でハイブリッドにできる
- 「今解いているクイズの回答途中」は Jotai で十分、
- 「称号・進捗・プロフィール」は localStorage やサーバー DB に保存

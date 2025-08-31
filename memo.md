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

## 気になる差分
- テスト時のモックはどうなる？
- zustand vs jotai でそれぞれが優れているパターン？
  - 階層の深いコンポーネント？
  - いろんな箇所で使われる state ?
  - ピタゴラスイッチ的に連鎖する state ?

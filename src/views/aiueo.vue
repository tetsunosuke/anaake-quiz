<template>
<div>
<table>
<tr>
<td @click="$emit('revealByChar', 'ー')">ー</td>
<td @click="$emit('revealByChar', 'わ')">わ</td>
<td @click="$emit('revealByChar', 'ら')">ら</td>
<td @click="$emit('revealByChar', 'や')">や</td>
<td @click="$emit('revealByChar', 'ま')">ま</td>
<td @click="$emit('revealByChar', 'は')">は</td>
<td @click="$emit('revealByChar', 'な')">な</td>
<td @click="$emit('revealByChar', 'た')">た</td>
<td @click="$emit('revealByChar', 'さ')">さ</td>
<td @click="$emit('revealByChar', 'か')">か</td>
<td @click="$emit('revealByChar', 'あ')">あ</td>
</tr>
<tr>
  <td></td>
  <td></td>
<td @click="$emit('revealByChar', 'り')">り</td>
  <td></td>
<td @click="$emit('revealByChar', 'み')">み</td>
<td @click="$emit('revealByChar', 'ひ')">ひ</td>
<td @click="$emit('revealByChar', 'に')">に</td>
<td @click="$emit('revealByChar', 'ち')">ち</td>
<td @click="$emit('revealByChar', 'し')">し</td>
<td @click="$emit('revealByChar', 'き')">き</td>
<td @click="$emit('revealByChar', 'い')">い</td>
</tr>
<tr>
  <td></td>
<td @click="$emit('revealByChar', 'を')">を</td>
<td @click="$emit('revealByChar', 'る')">る</td>
<td @click="$emit('revealByChar', 'ゆ')">ゆ</td>
<td @click="$emit('revealByChar', 'む')">む</td>
<td @click="$emit('revealByChar', 'ふ')">ふ</td>
<td @click="$emit('revealByChar', 'ぬ')">ぬ</td>
<td @click="$emit('revealByChar', 'つ')">つ</td>
<td @click="$emit('revealByChar', 'す')">す</td>
<td @click="$emit('revealByChar', 'く')">く</td>
<td @click="$emit('revealByChar', 'う')">う</td>
</tr>
<tr>
  <td></td>
<td></td>
<td @click="$emit('revealByChar', 'れ')">れ</td>
<td></td>
<td @click="$emit('revealByChar', 'め')">め</td>
<td @click="$emit('revealByChar', 'へ')">へ</td>
<td @click="$emit('revealByChar', 'ね')">ね</td>
<td @click="$emit('revealByChar', 'て')">て</td>
<td @click="$emit('revealByChar', 'せ')">せ</td>
<td @click="$emit('revealByChar', 'け')">け</td>
<td @click="$emit('revealByChar', 'え')">え</td>
</tr>
<tr>
  <td></td>
<td @click="$emit('revealByChar', 'ん')">ん</td>
<td @click="$emit('revealByChar', 'ろ')">ろ</td>
<td @click="$emit('revealByChar', 'よ')">よ</td>
<td @click="$emit('revealByChar', 'も')">も</td>
<td @click="$emit('revealByChar', 'ほ')">ほ</td>
<td @click="$emit('revealByChar', 'の')">の</td>
<td @click="$emit('revealByChar', 'と')">と</td>
<td @click="$emit('revealByChar', 'そ')">そ</td>
<td @click="$emit('revealByChar', 'こ')">こ</td>
<td @click="$emit('revealByChar', 'お')">お</td>
</tr>
</table>
</div>
</template>

<script>
export default {
  name:"auieo",
}
</script>

function dobae () {
  for (let i = 0; i < 10; i++) {
    document.write(i)
  }
}
document.getElementById('test').setAttribute('onclick', 'dobae()')

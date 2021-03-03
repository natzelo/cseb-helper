function numberExt(s) {
  let num1 = "";
  let num2 = "";

  let index = 0;

  for (let i = 1; i < s.length; i++) {
    if (s[i] === "/") {
      index = i;
      break;
    } else {
      num1 += s[i];
    }
  }

  for (let i = index + 1; i < s.length; i++) {
    num2 += s[i];
  }

  num1 = parseInt(num1);
  num2 = parseInt(num2);

  return {
    first: num1,
    second: num2,
  };
}

export default numberExt;

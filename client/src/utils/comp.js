import numberExt from "./numberExt";

function comp(s1, s2) {
  const r1 = numberExt(s1);
  const r2 = numberExt(s2);

  if (r1.first > r2.first) return 1;
  else if (r2.first > r1.first) return -1;
  else {
    if (r1.second > r2.second) return 1;
    else return -1;
  }
}

export default comp;

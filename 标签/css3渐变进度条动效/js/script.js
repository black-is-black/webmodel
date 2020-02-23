const _PRG = document.getElementById('p'),
_OUT = document.querySelector('[for=p]'),
K = 5,TMAX = K * _PRG.max;

function load(t = 0) {
  if (t <= TMAX) {
    if (t % K === 0) _OUT.value = _PRG.value = t / K;
    requestAnimationFrame(load.bind(this, t + (Math.random() > .5)));
  }
};

load();
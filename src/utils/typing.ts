export const TxtType = (el: HTMLElement, toRotate: string[], period: string) => {
  let loopNum = 0;
  let txt = '';
  let isDeleting = false;

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullTxt = toRotate[i];

    if (isDeleting) {
      txt = fullTxt.substring(0, txt.length - 1);
    } else {
      txt = fullTxt.substring(0, txt.length + 1);
    }

    el.innerHTML = `<span class="wrap">${txt}</span>`;

    let delta = 200 - Math.random() * 100;

    if (isDeleting) {
      delta /= 2;
    }

    if (!isDeleting && txt === fullTxt) {
      isDeleting = true;
      delta = parseInt(period, 10) || 2000;
    } else if (isDeleting && txt === '') {
      isDeleting = false;
      loopNum++;
      delta = 500;
    }

    setTimeout(() => {
      tick();
    }, delta);
  };

  tick();
};

window.onload = () => {
  const elements = document.getElementsByClassName('typewrite');

  for (let i = 0; i < elements.length; i++) {
    const toRotate = elements[i].getAttribute('data-type');
    const period = elements[i].getAttribute('data-period');

    if (toRotate) {
      TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  // INJECT CSS
  const css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}';
  document.body.appendChild(css);
};

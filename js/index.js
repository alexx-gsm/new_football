window.addEventListener('load', function() {
  const mainPage = document.querySelector('.page');
  const board = document.querySelector('.board');
  const field = document.querySelector('.field');
  const soundIcon = document.querySelector('.icon-sound');
  const modalGoalConfirm = document.querySelector('.modal--goal-confirm');
  const modalWinner = document.querySelector('.modal--winner');

  // video
  const videoBG = document.querySelector('#video-bg');
  const videoGKWin = document.querySelector('#video-kick-gk-win');
  // video handlers
  const videoStop = video => {
    video.pause();
    video.classList.add('hide');
  };
  const videoPlay = video => {
    video.classList.remove('hide');
    video.play();
  };
  const videoStopAll = () =>
    document.querySelectorAll('video').forEach(video => videoStop(video));

  // bg-image
  const imageBG = document.querySelector('#image-bg');
  // bg-image handlers
  const imageHide = elem => elem.classList.add('hide');
  const imageShow = elem => elem.classList.remove('hide');

  // ---------------------------
  const showMenu = () =>
    document.querySelector('#menu').classList.remove('fade');
  const hideMenu = () => document.querySelector('#menu').classList.add('fade');

  const showModal = item => {
    item.classList.add('in');
    mainPage.classList.add('blur');
    soundIcon.classList.add('hide');
  };

  const hideModal = item => {
    item.classList.remove('in');
    mainPage.classList.remove('blur');
    soundIcon.classList.remove('hide');
  };

  const showMainPage = () => {
    imageShow(imageBG);
    videoStopAll();
    board.classList.remove('in');
    mainPage.classList.remove('page--login');
    showMenu();
    field.classList.add('hide');
  };

  const showKickSelectPage = () => {
    imageHide(imageBG);
    videoStopAll();
    videoPlay(videoBG);
    board.classList.add('in');
    field.classList.remove('hide');
    soundIcon.classList.remove('hide');
    console.log('kick');
  };

  // MOBILE MENU
  const btnMobileMenu = document.querySelector('#btn-mobile-menu');
  const mobileMenu = document.querySelector('#mobile-menu');

  if (btnMobileMenu && mobileMenu) {
    btnMobileMenu.addEventListener('click', () =>
      mobileMenu.classList.toggle('open')
    );
  }

  // PLAYER SELECT
  const selection = document.querySelector('.selection');
  const bgSelection = document.querySelector('#bg-selection');

  if (bgSelection) {
    bgSelection.addEventListener('click', () => {
      if (selection.classList.contains('left')) {
        selection.classList.remove('left');
        selection.classList.add('right');
      } else {
        selection.classList.remove('right');
        selection.classList.add('left');
      }
    });
  }

  //   Add PLAY btn listeners
  const btnForwardPlay = document.querySelector('#forward-play');
  const btnGoalkeeperPlay = document.querySelector('#goalkeeper-play');
  const modalLogin = document.querySelector('.modal--login');

  // hide player selections & show login Modal
  const handleLoginModal = () => {
    mainPage.classList.add('page--login');
    soundIcon.classList.add('hide');

    setTimeout(() => {
      showModal(modalLogin);
    }, 500);
  };

  // add btn-close listener
  document.querySelector('#close-login').addEventListener('click', () => {
    hideModal(modalLogin);
    setTimeout(() => {
      mainPage.classList.remove('page--login');
      soundIcon.classList.remove('hide');
    }, 100);
  });

  if (btnForwardPlay && btnGoalkeeperPlay) {
    btnForwardPlay.addEventListener('click', () => handleLoginModal());
    btnGoalkeeperPlay.addEventListener('click', () => handleLoginModal());
  }

  // LOGIN SUBMIT
  const btnLoginSubmit = document.querySelector('#login-submit');
  const modalGameType = document.querySelector('#modal-type');

  //  SHOW GAME-TYPE SELECT MODAL
  if (btnLoginSubmit) {
    btnLoginSubmit.addEventListener('click', e => {
      e.preventDefault();
      hideModal(modalLogin);
      showModal(modalGameType);
      hideMenu();
      soundIcon.classList.add('hide');
    });
  }

  // btn-close listener for GAME-TYPE-SELECT MODAL
  document.querySelector('#close-type').addEventListener('click', e => {
    e.preventDefault();
    hideModal(modalGameType);
    setTimeout(() => {
      mainPage.classList.remove('page--login');
      soundIcon.classList.remove('hide');
      showMenu();
    }, 100);
  });

  // START PLAYING
  const btnPlayForWin = document.querySelector('#play-winning');
  const btnPlayForTrain = document.querySelector('#play-trainning');

  const handlePlayModeModal = () => {
    hideModal(modalGameType);
    showKickSelectPage();
  };

  if (btnPlayForWin && btnPlayForTrain) {
    btnPlayForTrain.addEventListener('click', () => handlePlayModeModal());
    btnPlayForWin.addEventListener('click', () => handlePlayModeModal());
  }

  // BALL TRACKS
  const btnsSelectGoal = document.querySelectorAll('.field__gate .btn');

  const showGoalConfirm = () => {
    board.classList.remove('in');
    field.classList.add('hide');
    showModal(modalGoalConfirm);
  };

  modalGoalConfirm
    .querySelector('.btn--close')
    .addEventListener('click', () => {
      board.classList.add('in');
      field.classList.remove('hide');
      hideModal(modalGoalConfirm);
    });

  document.querySelector('#goal-select').addEventListener('click', () => {
    board.classList.add('in');
    field.classList.remove('hide');
    hideModal(modalGoalConfirm);
  });

  document.querySelector('#goal-submit').addEventListener('click', () => {
    hideModal(modalGoalConfirm);
    videoStop(videoBG);
    videoPlay(videoGKWin);
    board.classList.add('in');
    videoGKWin.addEventListener('ended', () => {
      board.classList.remove('in');
      showModal(modalWinner);
    });
  });

  if (btnsSelectGoal) {
    btnsSelectGoal.forEach(item => {
      item.addEventListener('mouseover', function(e) {
        const btnTop = Math.floor(e.target.getBoundingClientRect().top);
        const btnLeft = Math.floor(e.target.getBoundingClientRect().left);

        const track = document.querySelector('#line');
        track.style.right = window.innerWidth - btnLeft - 30 + 'px';
        track.style.top = btnTop + 20 + 'px';

        const trackWidth = track.clientWidth;
        const trackHeght = track.clientHeight;

        let trackLine = SVG('line')
          .viewbox(0, 0, trackWidth, trackHeght * 2)
          .width(trackWidth)
          .height(trackHeght * 2);

        trackLine
          .path(
            `M3 ${trackHeght - 3} C ${trackWidth / 3} ${trackHeght /
              2}, ${trackWidth / 3} ${trackHeght / 2}, ${trackWidth} 0`
          )
          .attr({
            fill: 'transparent',
            stroke: 'white',
            width: trackWidth,
            height: trackHeght * 2
          });

        item.classList.add('active');
        item.innerHTML = 'Удар';

        item.addEventListener('mouseout', function(e) {
          // e.preventDefault();
          const svg = document.querySelector('#line svg');
          if (svg) svg.parentNode.removeChild(svg);
          this.classList.remove('active');
          this.innerHTML = 'Выбрать';
        });
      });
      item.addEventListener('click', e => showGoalConfirm());
    });
  }

  // Tablo
  const btnGoMain = document.querySelector('#tablo-go-main');
  if (btnGoMain) {
    btnGoMain.addEventListener('click', () => showMainPage());
  }

  // Sound handle
  const btnSound = document.querySelector('.icon-sound');
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      btnSound.classList.toggle('off');
    });
  }

  // Winner modal
  const btnNewGame = document.querySelector('#game-new');
  if (btnNewGame) {
    btnNewGame.addEventListener('click', () => {
      hideModal(modalWinner);
      setTimeout(() => {
        soundIcon.classList.remove('hide');
        showMainPage();
      }, 100);
    });
  }

  // WINNER MODAL: game-continue select
  const btnContinueGame = document.querySelector('#game-continue');
  if (btnContinueGame) {
    btnContinueGame.addEventListener('click', () => {
      hideModal(modalWinner);
      showKickSelectPage();
    });
  }
});

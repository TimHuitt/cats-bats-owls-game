// cat: https://cdn.pixabay.com/photo/2016/04/01/09/50/afraid-1299617_1280.png
// bat: https://cdn.pixabay.com/photo/2016/04/01/11/13/animal-1300257_1280.png
// owl: https://cdn.pixabay.com/photo/2021/01/11/21/24/owl-5909747_1280.png

// reset all elements
function reset(selected) {
    const targetList = ['cat', 'bat', 'owl'];
    // set starting positions
    const start = {
      cat: 315,
      bat: 0,
      owl: 45,
    };
  
    for (const target of targetList) {
      const thisStart = start[target];
      $('.' + target).data('pos', thisStart);
      $('.' + target + '-container').show();
      $('.' + target + '-container').css('height', '165%');
      $('.' + target + '-container').css('transform', 'rotate(' + thisStart + 'deg)');
      $('.' + target + '-picked').css('height', '50%');
      $('.' + target + '-picked').css('display', 'none')
      $('.current-text').text('Pick One');
      $('body').removeClass('disabled');
      $(target).addClass('black:hover');
    }
  }
  
  // determine winner and run attack animation
  function attack(selected, enemy) {
    const pos = $('.' + selected).data('pos');
    const wins = parseInt($('.win').text());
    const losses = parseInt($('.loss').text());
    const draws = parseInt($('.draw').text());
    
    let win = false;
    let loss = false;
    let draw = false;
    let score = [wins, losses, draws];
    
    if (selected === 'bat') {
      if (enemy === 'bat') {
        score[2] += 1
        draw = true;
      } else if (enemy === 'cat') {
        score[1] += 1 
        loss = true;
      } else if (enemy === 'owl') {
        score[0] += 1 
        win = true;
      }
      
    } else if (selected === 'cat') {
      if (enemy === 'bat') {
        score[0] += 1
        win = true; 
      } else if (enemy === 'cat') {
        score[2] += 1 
        draw = true;
      } else if (enemy === 'owl') {
        score[1] += 1
        loss = true;
      }
      
    } else if (selected === 'owl') {
      if (enemy === 'bat') {
        score[1] += 1
        loss = true;
      } else if (enemy === 'cat') {
        score[0] += 1 
        win = true;
      } else if (enemy === 'owl') {
        score[2] += 1
        draw = true;
      }
    }
    
    setTimeout(function() {
      if (win) {
        $('.current-text').text('WIN');
        $('.' + selected + '-picked').addClass('top');
        $('.' + enemy + '-container').removeClass('top');
        $('.' + selected + '-picked').css('height', '165%');
      } else if (loss) {
        $('.current-text').text('LOSE');
        $('.' + enemy + '-container').addClass('top');
        $('.' + selected + '-picked').removeClass('top');
        $('.' + enemy + '-container').css('height', '50%');
      } else if (draw) {
        $('.current-text').text('DRAW');
        $('.' + enemy + '-container').css('height', '100%');
        $('.' + selected + '-picked').css('height', '100%');
      }
      
      $('.scoreboard').html(`
        <span>W: <span class="win">`+ score[0] + `</span></span>
        <span>L: <span class="loss">`+ score[1] + `</span></span>
        <span>D: <span class="draw">`+ score[2] + `</span></span>
      `)
    }, 1500);
  }
  
  // randomly select an opponent
  function enemySelect(selected) {
    const spin = 1080;
    const targetList = ['cat', 'bat', 'owl']
    const enemy = targetList[Math.floor(Math.random() * 3)];
    
    for (target of targetList) {
      $('.' + target + '-container').css('transform', 'rotate(' + spin + 'deg)');
    }
    
    setTimeout(function() {
      for (target of targetList) {
        if (target !== enemy) {
          $('.' + target + '-container').hide();
        }
      }
    }, 500);
    
    attack(selected, enemy);
  }
  
  // user selection
  function makeSelection(selected) {
    const pos = $('.' + selected).data('pos');
    const current = $('.' + selected + '-container')
    
    current.css('height', '50%');
    
    if (selected == 'cat') {
      current.css('transform', 'rotate(0deg)');
    } else {
      current.css('transform', 'rotate(360deg)');
    }
    
    setTimeout(function() {
      $('.current-text').text('-vs-');
    }, 500);
    
    setTimeout(function() {
      $('.current-text').text('-vs-');
      current.css('height', '165%');
      current.hide();
      current.css('transform', 'rotate(' + pos + 'deg)');
      $('.' + selected + '-picked').css('display', 'flex')
    }, 1000);
    
    setTimeout(function() {
      current.show();
      enemySelect(selected)
    }, 1500);
  }
  
  // handle game item clicks
  function handleClick(element) {
    const player = {
      currentChoice: ''
    }
    const classList = $(element).attr('class');
    
    player.currentChoice = classList.slice(0, 3)
    
    const selected = player.currentChoice;
    const pos = $('.' + selected).data('pos');
    let attackPos = 0;
    
    makeSelection(selected);
    
    setTimeout(function() {
      reset(selected);
    }, 4000);
  }
  
  // show rules on click/hover
  $('.rules').on('click mouseover', function(event) {
    $('.rules').css('top', '10%');
    $('.rules-header').css('display', 'none');
    event.stopPropagation();
  });
  
  // hide rules when container loses focus
  $('.rules').on('mouseleave', function(event) {
    $('.rules').css('top', '83%');
    $('.rules-header').css('display', 'flex');
    event.stopPropagation();
  });
  
  // send all selection clicks to handleClicks
  // disable all interaction until animation completes
  $('.selection').click(function () {
    $('body').addClass('disabled');
    handleClick(this)
  });
  
  
  reset();
  
  
  
  /* JS
  
  // reset all elements
  function reset() {
    const targetList = ['cat', 'bat', 'owl'];
    // set starting positions
    const start = {
      cat: 315,
      bat: 0,
      owl: 45,
    };
  
    for (const thisTarget of targetList) {
      const thisStart = start[thisTarget];
      const targetClass = '.' + thisTarget
      const containerClass = '.' + thisTarget + '-container'
      const pickedClass = '.' + thisTarget + '-picked'
      
      const target = document.querySelector(targetClass);
      const container = document.querySelector(containerClass);
      const picked = document.querySelector(pickedClass);
      const currentText = document.querySelector('.current-text');
      const body = document.querySelector('body');
      
      target.dataset.pos = thisStart;
      target.style.display = 'flex';
      container.style.display = 'flex';
      container.style.height = '165%';
      container.style.transform = 'rotate(' + thisStart + 'deg)';
      picked.style.height = '50%';
      picked.style.display = 'none';
      currentText.innerText = 'Pick One';
      body.classList.remove('disabled');
    }
  }
  
  // determine winner and run attack animation
  function attack(selected, enemy) {
    const pos = document.querySelector('.' + selected).dataset.pos;
    const wins = parseInt(document.querySelector('.win').textContent);
    const losses = parseInt(document.querySelector('.loss').textContent);
    const draws = parseInt(document.querySelector('.draw').textContent);
    
    let win = false;
    let loss = false;
    let draw = false;
    let score = [wins, losses, draws];
    
    if (selected === 'bat') {
      // bat vs bat
      if (enemy === 'bat') {
        score[2] += 1
        draw = true;
      // bat vs cat
      } else if (enemy === 'cat') {
        score[1] += 1 
        loss = true;
      // bat vs owl
      } else if (enemy === 'owl') {
        score[0] += 1 
        win = true;
      }
      
    } else if (selected === 'cat') {
      // cat vs bat
      if (enemy === 'bat') {
        score[0] += 1
        win = true; 
      // cat vs cat
      } else if (enemy === 'cat') {
        score[2] += 1 
        draw = true;
      // cat vs owl
      } else if (enemy === 'owl') {
        score[1] += 1
        loss = true;
      }
      
    } else if (selected === 'owl') {
      // owl vs bat
      if (enemy === 'bat') {
        score[1] += 1
        loss = true;
      // owl vs cat
      } else if (enemy === 'cat') {
        score[0] += 1 
        win = true;
      // owl vs owl
      } else if (enemy === 'owl') {
        score[2] += 1
        draw = true;
      }
    }
    
    console.log(selected, enemy)
    selected = document.querySelector('.' + selected + '-picked');
    enemy = document.querySelector('.' + enemy + '-container');
    const scoreboard = document.querySelector('.scoreboard')
    const text = document.querySelector('.current-text');
  
    
    // set outcomes
    setTimeout(function() {
      if (win) {
        text.innerText = 'WIN';
        selected.classList.add('top');
        enemy.classList.remove('top');
        selected.style.height = '165%';
      } else if (loss) {
        text.innerText = 'LOSE';
        enemy.classList.add('top');
        selected.classList.remove('top');
        enemy.style.height = '50%';
      } else if (draw) {
        text.innerText = 'DRAW';
        enemy.style.height = '100%';
        selected.style.height = '100%';
      }
      // set scoreboard
      scoreboard.innerHTML = `
        <span>W: <span class="win">`+ score[0] + `</span></span>
        <span>L: <span class="loss">`+ score[1] + `</span></span>
        <span>D: <span class="draw">`+ score[2] + `</span></span>`
    }, 1500);
  }
  
  function enemySelect(selected) {
    const spin = 1080;
    const targetList = ['cat', 'bat', 'owl']
    const enemy = targetList[Math.floor(Math.random() * 3)];
    
    for (let target of targetList) {
      var thisTarget = document.querySelector('.' + target);
      var targetContainer = document.querySelector('.' + target + '-container');
      targetContainer.style.transform = 'rotate(' + spin + 'deg)';
    }
    setTimeout(function() {
      for (let target of targetList) {
        if (target !== enemy) {
          console.log(target)
          thisTarget.style.display = 'none';
        }
      }
    }, 500);
  
    attack(selected, enemy);
  }
  
  function makeSelection(selected) {
    const pos = document.querySelector('.' + selected).dataset.pos;
    const text = document.querySelector('.current-text')
    const picked = document.querySelector('.' + selected + '-picked')
    const container = document.querySelector('.' + selected + '-container')
    
    container.style.height = '50%';
    
    if (selected == 'cat') {
      container.style.transform = 'rotate(0deg)';
    } else {
      container.style.transform = 'rotate(360deg)';
    }
    
    setTimeout(function() {
      text.innerText = '-vs-';
    }, 500);
    
    setTimeout(function() {
      container.style.height = '165%';
      container.style.display = 'none';
      container.style.transform = 'rotate(' + pos + 'deg)';
      picked.style.display = 'flex';
    }, 1000);
    
    setTimeout(function() {
      container.style.display = 'none';
      enemySelect(selected)
    }, 1500);
  }
  
  function handleClick(element) {
    const classList = element.className;
    const selected = classList.slice(0, 3);
    const pos = document.querySelector('.' + selected).dataset.pos;
    let attackPos = 0;
    
    makeSelection(selected);
    
    setTimeout(function() {
      reset();
    }, 5000);
  }
  
  $('.rules').on('click mouseover', function(event) {
    $('.rules').css('top', '10%');
    document.querySelector('.rules-header').classList.add('hidden');
    event.stopPropagation();
  });
  
  $('.rules').on('mouseleave', function(event) {
    $('.rules').css('top', '83%');
    document.querySelector('.rules-header').classList.remove('hidden');
    event.stopPropagation();
  });
  
  $('.selection').click(function () {
    document.querySelector('body').classList.add('disabled');
    handleClick(this)
  });
  
  reset();
   */
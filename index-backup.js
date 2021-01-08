var exec = document.querySelector('#execel');
var tbody = document.querySelector('#table tbody');
var dataset =[]; 
var value;
var pause = false;
var openCount = 0;

exec.addEventListener('click',function(){
    tbody.innerHTML='';//내부 초기화
    dataset = [];
    pause = false;
    openCount = 0;
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);


    //지뢰 위치 뽑기
    var mineArr = Array(hor * ver).fill().map(function(item,index){
        return index;
    });

    var mines = [];
    while (mineArr.length > (hor * ver) - mine){
        var random = mineArr.splice(Math.floor(Math.random()*mineArr.length),1)[0];
        mines.push(random);
    } 


    //네모칸 만들기
    
    for(i=0; i<ver; i++){
        var arr=[];
        dataset.push(arr);
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        for(j=0; j<hor; j++){
            arr.push(0);
            var td = document.createElement('td');
            td.textContent= '';
            //깃발이벤트 심기
            td.addEventListener('contextmenu',function(e){
                e.preventDefault();
                if(pause){
                    return; 
                }
                e.target.classList.add('rClicked');
                var trT = e.target.parentNode;
                var tbodyT = e.target.parentNode.parentNode;
                var block = Array.prototype.indexOf.call(trT.children, e.target);
                var line = Array.prototype.indexOf.call(tbodyT.children, trT);
                if( ['','X'].includes(e.target.textContent)){
                    //value = e.target.textContent;
                    console.log(value);
                    e.target.textContent='!';
                }else if(e.target.textContent === '!'){
                    e.target.textContent='?';
                }else if(e.target.textContent = '?'){
                    if(dataset[line][block] === 'X'){
                        e.target.textContent='X';
                    }else{
                        e.target.textContent='';
                    }
                }

            })
            //click event
            td.addEventListener('click',function(e){
                if(pause){
                    return; 
                }
                e.target.classList.add('clicked');
                var trT = e.target.parentNode;
                var tbodyT = e.target.parentNode.parentNode;
                var block = Array.prototype.indexOf.call(trT.children, e.target);
                var line = Array.prototype.indexOf.call(tbodyT.children, trT);
                if(dataset[line][block] === 1){
                    return;
                }
                if(e.target.textContent === 'X'){
                    e.target.textContent = '펑!'
                    pause = true;
                }else{//지뢰가 아닐때
                    if(dataset[line][block] !== 1){
                        openCount++;
                    }
                    dataset[line][block] = 1;
                
                    var round = [dataset[line][block -1],
                    dataset[line][block +1]];
                    if(dataset[line -1]){
                        round = round.concat(
                            [dataset[line -1][block -1],
                            dataset[line -1][block],
                            dataset[line-1][block +1]])
                    } 
                    if(dataset[line +1]){
                        round = round.concat(
                            [dataset[line +1][block -1],
                            dataset[line +1][block],
                            dataset[line+1][block +1]])
                    } 
                    var mineCount = round.filter(function(v){
                        return v === 'X';
                    }).length;
                    e.target.textContent = mineCount || ''; // A||B A의 값이 거짓의 값(null, 0 ,undefined, Nan,false)이면 B로 적용
                    //0 주면 8개 오픈
                    if(e.target.textContent === ''){
                        console.log(line,block);
                        var zeroRound = [tbody.children[line].children[block -1],
                        tbody.children[line].children[block +1]];
                        if(tbody.children[line -1]){
                            zeroRound = zeroRound.concat(
                                [tbody.children[line -1].children[block -1],
                                tbody.children[line -1].children[block],
                                tbody.children[line-1].children[block +1]])
                        } 
                        if(tbody.children[line +1]){
                            zeroRound = zeroRound.concat(
                                [tbody.children[line +1].children[block -1],
                                tbody.children[line +1].children[block],
                                tbody.children[line+1].children[block +1]])
                        } 
                        
                        zeroRound.filter(function(v){
                            return !!v
                        }).forEach(function(v){
                            var trT = v.parentNode;
                            var tbodyT = v.parentNode.parentNode;
                            var block = Array.prototype.indexOf.call(trT.children, v);
                            var line = Array.prototype.indexOf.call(tbodyT.children, trT);
                            if(dataset[line][block] !== 1){
                                v.click();
                            }
                         

                        })
                    }
                }
               if(openCount === (hor*ver)-mine){
                   pause = true;
                   console.log("end");
               }

            })

            tr.appendChild(td);
            
        }
        
    }
    //지뢰 심기
    for(var i =0; i < mines.length; i++){
        var horOrder = Math.floor(mines[i]/hor);
        var verOrder = mines[i] % hor;
        tbody.children[horOrder].children[verOrder].textContent='X';
        dataset[horOrder][verOrder] = "X";
    }

})

var timer = document.querySelector('#timer');
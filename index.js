var exec = document.querySelector('#execel');
var tbody = document.querySelector('#table tbody');
var dataset =[]; 

exec.addEventListener('click',function(){
    tbody.innerHTML='';//내부 초기화
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
    console.log(mines);

    //네모칸 만들기
    
    for(i=0; i<ver; i++){
        console.log(ver);
        var arr=[];
        dataset.push(arr);
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        for(j=0; j<hor; j++){
            arr.push(1);
            var td = document.createElement('td');
            td.textContent= '';
            //깃발이벤트 심기
            td.addEventListener('contextmenu',function(e){
                e.preventDefault();
                console.log('RIGHT',e.target.textContent);
                var trT = e.target.parentNode;
                var tbodyT = e.target.parentNode.parentNode;
                var block = Array.prototype.indexOf.call(trT.children, e.target);
                var line = Array.prototype.indexOf.call(tbodyT.children, trT);
                if( ['','X'].includes(e.target.textContent)){
                    e.target.textContent='!';
                }else if(e.target.textContent === '!'){
                    e.target.textContent='?';
                }else if(e.target.textContent = '?')
                e.target.textContent=dataset[line][block];

                
        })
            tr.appendChild(td);
            
        }
        
    }
    //지뢰 심기
    console.log(mines);
    for(var i =0; i < mines.length; i++){
        var horOrder = Math.floor(mines[i]/hor);
        var verOrder = mines[i] % hor;
        console.log(horOrder,verOrder);
        tbody.children[horOrder].children[verOrder].textContent='X';
        dataset[horOrder][verOrder] = "X";
    }
    console.log(dataset);

})

var timer = document.querySelector('#timer');
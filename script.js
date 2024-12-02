

let nb_points ;
let nb_debt;
let done1 ;
let txt_points ;
let interets=2;

//investment A
let avg_share_A_value;
const base_value_A = 10000;
let last_last_last_value_A ;
let last_last_value_A ;
let last_value_A;
let minf_value_A = [0,0,0,0,0,0,0,0,0,0];
let nb_share_A = 0;
let share_A_value =Math.floor( last_value_A/( base_value_A/10 ) );

//investment B
let avg_share_B_value;
const base_value_B = 10000;
let last_value_B;
let minf_value_B = [0,0,0,0,0,0,0,0,0,0];
let nb_share_B = 0;
let share_B_value =Math.floor( last_value_B/( base_value_B/10 ) );

init();
setInterval( () => tick(),1000 );
function init(){
    if( getCookie( "my_name","" )!="" ){
        nb_points = parseInt( getCookie( "nb_points",0 ) );
        nb_debt = parseInt( getCookie( "nb_debt",0 ) );
        done1 = true;

        //investment A
        last_last_last_value_A = parseInt( getCookie( "last_last_last_value_A",base_value_A ) );
        last_last_value_A = parseInt( getCookie( "last_last_value_A",base_value_A ) );
        last_value_A = parseInt( getCookie( "last_value_A",base_value_A ) );
        avg_share_A_value = parseInt( getCookie( "avg_share_A_value",0 ) );
        nb_share_A = parseInt( getCookie( "nb_share_A",0 ) );
        share_A_value = Math.floor( last_value_A / (  base_value_A / 10  ) );

        //investment B
        last_value_B = parseInt( getCookie( "last_value_B",base_value_B ) );
        avg_share_B_value = parseInt( getCookie( "avg_share_B_value",0 ) );
        nb_share_B = parseInt( getCookie( "nb_share_B" , 0 ) );
        share_B_value = Math.floor(  last_value_B / (  base_value_B / 10  ) );

        txt_points = "number of points of "+getCookie( "my_name" )+":";
        interets = parseInt( getCookie( "interets" , 2 ) );
        tick();
    }else{
        nb_debt = 0;
        nb_points = 0;
        done1 = false;
        txt_points = "number of points:";
        //investment A
        avg_share_A_value=0;
        last_last_last_value_A = base_value_A;
        last_last_value_A = last_last_last_value_A;
        last_value_A = last_last_value_A;

        //investment B
        avg_share_B_value=0;
        last_value_B = base_value_B
        
    }
    tick();
}
function IaN( value ){
    if ( value  == null || value == NaN || value == "" || typeof( value ) == String){
        return false;
    }else{
        return true;
    }
}
function getCookie( cname , default_value ) {
    let name = cname + "=";
    let decoded_cookie = decodeURIComponent( document.cookie );
    let splited = decoded_cookie.split( ';' );
    for( let i = 0; i <splited.length; i++ ) {
      let c = splited[i];
      while ( c.charAt( 0 ) == ' ' ) {
        c = c.substring( 1 );
      }
      if ( c.indexOf( name ) == 0 ) {
        return c.substring( name.length, c.length );
      }
    }
    return default_value;
}
function deleteAllCookies() {
    document.cookie.split( ';' ).forEach( cookie => {
        const eqPos = cookie.indexOf( '=' );
        const name = eqPos > -1 ? cookie.substring( 0, eqPos ) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    } );
}
function restart(){
    deleteAllCookies();
    location.reload( true );
}
function tick(){
    if ( nb_points<0 ){
        nb_debt -=nb_points;
        nb_points = 0;
    }
    hold();
    document.getElementById( "nb_points" ).innerHTML = nb_points;
    document.getElementById( "txt_points" ).innerHTML = txt_points;
    
    document.getElementById( "nb_debt" ).innerHTML = nb_debt;
    document.getElementById( "amount_to_pay" ).innerHTML = Math.ceil( nb_debt*interets );
    document.cookie = "interets=" + parseInt( interets );
    document.cookie = "nb_points="+parseInt( nb_points );
    document.cookie = "nb_debt="+parseInt( nb_debt );
    document.cookie = "nb_share_A="+parseInt( nb_share_A );
    document.cookie = "nb_share_B="+parseInt( nb_share_B );
}
function roll_dice(){
    return Math.floor( Math.random()*6 )+1;
}
function bonjour(){
    alert( "Hello"+( getCookie( "my_name" , "" )!=""?( " "+getCookie( "my_name" , "" ) ):"" )+" !" );
    if( !done1 ){
        nb_points ++;
        tick();
    }
    done1 = true;
}
function nom(){
    let my_name=prompt( "What's your name ?" )
    document.cookie = "my_name="+my_name;
    alert( "My name is \""+ my_name+"\"" );
    txt_points = "Number of points of "+my_name+" :";
    tick();
}
function guess(){
    let rand_num = Math.floor( Math.random()*20 )+1;
    let nb_guess = 4
    let guess ;
    let flag = false;
    let status = "0"
    while( nb_guess>0 ){
        guess = prompt( "Try a"+( status=="0"?"":( " "+( status=="+"?" bigger":" smaller" ) ) )+" number ( between 0 and 20 ).\n" + ( nb_guess>1?( nb_guess+" remaining try." ): "Last try !" ) );
        if ( guess == rand_num ){
            alert( "Victory !\n"+rand_num );
            flag = true;
            nb_points +=nb_guess;
            break;
        }else if ( guess < rand_num ){
            status = "+"
        }else{
            status = "-"
        }
        nb_guess --;
    }
    if ( !flag ){
        alert( "Defeat !\nThe number was "+rand_num+"." );
        nb_points--;
    }
    tick();
}
function jeu_du_cochon(){
    if ( nb_points >0 ){
        let mise=0;
        
        do{
            mise = prompt( "How many do you bet ?\n( The bet gotta be <= "+nb_points+". )" );
        }while( mise > nb_points || !IaN( mise ) );
        let win=jeu();
        if( win ){
            alert( "Victory !\You win "+mise+" points." );

            nb_points+=parseInt( mise );
        }else{
            alert( "Defeat !" )
            nb_points-=parseInt( mise );
        }     
        tick();   
    }
}
function jeu(){
    let player1_score = 0;
    let player2_score = 0;
    while( player1_score<100 && player2_score<100 ){
        alert( "You : "+player1_score+"\nThe bot : "+player2_score+"\nYour turn !" );
        player1_score = parseInt( tour_de_jeu( player1_score ) );
        if ( player1_score>=100 ){
            break;
        }
        alert( "You : "+player1_score+"\nThe bot : "+player2_score+"\nThe bot turn !" );
        player2_score = parseInt( tour_de_jeu_bot( player2_score,player1_score ) );
        

    }
    if( player1_score>=100 ){
        return true;
    }else{
        return false;
    }

}
function bot_keep_playing( win ){
    let rand_num = Math.random();
    let cap = 0.5
    if ( win ){
        cap = 0.8
    }else{
        cap = 0.1
    }
    if( rand_num < cap ){
        return false;
    }else{
        return true;
    }
}
function tour_de_jeu_bot( bot_score,player_score ){
    let dice_1;
    let dice_2;
    let temp_score=0;
    let keep_playing=true;
    let flag=false;
    while( keep_playing ){
        dice_1 = roll_dice();
        dice_2 = roll_dice();
        alert( dice_1+"\n"+dice_2 );
        if ( dice_1 == 1 || dice_2 == 1 ) {
            temp_score = 0;
            flag = true;
            break
        }else{
            temp_score += dice_1 + dice_2;
            keep_playing = bot_keep_playing( ( bot_score + temp_score )>player_score );
        }
        
    }
    if ( !flag ){
        bot_score += temp_score;
    }
    return bot_score;
}
function tour_de_jeu( player_score ){
    let popup_state = true;
    let temp_score=0;
    let flag = false;
    let dice_1;
    let dice_2;
    while( popup_state ){
        dice_1 = roll_dice();
        dice_2 = roll_dice();
        if ( dice_1 == 1 || dice_2 == 1 ) {
            temp_score = 0;
            alert( dice_1+"\n"+dice_2+"\n\n No point this turn !" );
            flag = true;
            break
        }else{
            temp_score += dice_1 + dice_2;
            popup_state = confirm( dice_1+"\n"+dice_2+"\n\n"+temp_score );
        }
    }
    if ( !flag ){
        player_score += temp_score;
    }
    return player_score;
}
function gambling(){
    if ( nb_points >0 ){
        let mise;
        do{
            mise = prompt( "How much do you bet ?\n( The bet gotta be  <= "+nb_points+". )" );
        }while( mise>nb_points || mise<0 || !IaN( mise ) );
        let rand1 = Math.floor( Math.random()*10 )+1;
        let rand2 = Math.floor( Math.random()*10 )+1;
        let rand3 = Math.floor( Math.random()*10 )+1;
        alert( "-"+rand1+"-"+rand2+"-"+rand3+"-" );
        if ( rand1 == rand2 && rand1==rand3 ) {
            alert( "Victory !" );
            nb_points+=4*mise;
        }else if ( rand1==rand2 || rand1==rand3 ||rand2==rand3 ) {
            alert( "Victory !" );
            nb_points+=2*mise;
        }else{
            alert( "Defeat !" );
            nb_points-=mise;
        }
        tick();
    }
}
function hold(){
    //investemnt A
    let rand = Math.random();
    let rand2 = Math.random();
    let rand3 = Math.random()*0.2;
    let amp =1
    let cap = 0.5
    let new_value_A;
    let fact = 1;
    if ( last_value_A > last_last_value_A ){
        cap = cap>0.75?cap:0.75;
    }else if ( ( last_last_last_value_A < last_last_value_A && last_last_value_A<last_value_A ) || last_value_A <base_value_A/3 ){
        cap = cap<0.1?cap:0.1;
    }else{

        cap = cap<0.25?cap:0.25;
    }
    if ( last_value_A < base_value_A && last_last_value_A < base_value_A && last_last_last_value_A < base_value_A ) {
        amp +=0.5;
        cap -=0.05
        if ( amp > 3 ){
            amp = 3;
        }
    }else{
        amp -=0.01;
        cap +=0.05;
        if ( amp<1 ){
            amp =1;
        }
    }
    if ( cap>rand ){
        fact = 1 - ( rand2*rand3 );
    }else{
        if( cap==0.1 ){
            fact = 1 + ( rand2*0.5 );
        }else{
            fact = 1 + ( rand2*rand3 );
        }
    }
    new_value_A = parseInt( last_value_A * fact );
    document.getElementById( "var_fun_A" ).innerHTML = new_value_A;
    share_A_value =Math.floor( new_value_A/1000 );
    document.getElementById( "share_A_value" ).innerHTML = share_A_value;
    avg_share_A_value=nb_share_A==0?0:avg_share_A_value;
    document.getElementById( "nb_share_A" ).innerHTML = nb_share_A;
    document.getElementById( "avg_share_A_value" ).innerHTML = Math.round( ( ( avg_share_A_value==0?0:share_A_value )-avg_share_A_value )*10 )/10
    last_last_last_value_A = last_last_value_A
    last_last_value_A = last_value_A;
    last_value_A = new_value_A;
    document.cookie = "avg_share_A_value="+parseFloat( avg_share_A_value );
    document.cookie="last_last_last_value_A="+last_last_last_value_A;
    document.cookie="last_last_value_A="+last_last_value_A;
    document.cookie="last_value_A="+last_value_A;

    //investment B    
    let rand4 = (Math.random()*(base_value_B/4));
    let new_value_B;
    new_value_B = Math.floor(last_value_B - ( base_value_B / 8 ) + rand4);
    if (new_value_B <= 0){
        new_value_B = base_value_B-(3*rand4);
    }
    up_down_management( new_value_A , new_value_B );
    document.getElementById( "var_fun_B" ).innerHTML = new_value_B;
    share_B_value =Math.floor( new_value_B/1000 );
    document.getElementById( "share_B_value" ).innerHTML = share_B_value;
    avg_share_B_value=nb_share_B==0?0:avg_share_B_value;
    document.getElementById( "nb_share_B" ).innerHTML = nb_share_B;
    document.getElementById( "avg_share_B_value" ).innerHTML = Math.round( ( ( avg_share_B_value==0?0:share_B_value )-avg_share_B_value )*10 )/10 ;
    last_value_B = new_value_B;
    document.cookie = "avg_share_B_value="+parseFloat( avg_share_B_value );
    document.cookie="last_value_B="+last_value_B;
    
    
}
function up_down_management( new_value_A, new_value_B ){
    const xvalues = [-9,-8,-7,-6,-5,-4,-3,-2,-1,0];

    //investment A
    for ( i=0; i<minf_value_A.length; i++ ){
        if ( i!=( minf_value_A.length-1 ) ){
            minf_value_A[i]=minf_value_A[i+1];
        }else{
            minf_value_A[i]=last_value_A;
        }
    }
    const constvalue_A=avg_share_A_value*( base_value_A/10 );
    new Chart( "myChart_A", {
        type: "line",
        data: {
            labels: xvalues,
            datasets: [{
                data: minf_value_A,
                borderColor: "red",
                fill: true
            },{
                
                data: [constvalue_A,constvalue_A,constvalue_A,constvalue_A,constvalue_A,constvalue_A,constvalue_A,constvalue_A,constvalue_A,constvalue_A],
                borderColor: "green",
                fill: false
            }]
            
        },
        options: {
            animation : 0
            ,legend: {display: false}
            ,scales: {
                yAxes: [{ticks: {min: 1000, max:( last_value_A<20000? 25000:last_value_A+1000 )}}],
              }
        }
    } );

    //investment B
    for ( i=0; i<minf_value_B.length; i++ ){
        if ( i!=( minf_value_B.length-1 ) ){
            minf_value_B[i]=minf_value_B[i+1];
        }else{
            minf_value_B[i]=last_value_B;
        }
    }
    const constvalue_B=avg_share_B_value*( base_value_B/10 );
    new Chart( "myChart_B", {
        type: "line",
        data: {
            labels: xvalues,
            datasets: [{
                data: minf_value_B,
                borderColor: "blue",
                fill: true
            },{
                
                data: [constvalue_B,constvalue_B,constvalue_B,constvalue_B,constvalue_B,constvalue_B,constvalue_B,constvalue_B,constvalue_B,constvalue_B],
                borderColor: "green",
                fill: false
            }]
            
        },
        options: {
            animation : 0
            ,legend: {display: false}
            ,scales: {
                yAxes: [{ticks: {min: 1000, max:( last_value_B<20000? 25000:last_value_B+1000 )}}],
              }
        }
    } );
}
function buy_A(){
    /*save();*/
    if( nb_points>=share_A_value && share_A_value > 0){
        let buy_amount = 0; 
        do{
            buy_amount=prompt( "You will buy shares.\nHow many do you want ?\n( Your point's amount allow you to buy "+Math.floor( nb_points/share_A_value )+". )" );
        }while( ( buy_amount*share_A_value )>nb_points || buy_amount<0 || !IaN( buy_amount ) );
        avg_share_A_value = ( nb_share_A+buy_amount )!=0?( ( ( nb_share_A * avg_share_A_value )+( buy_amount*share_A_value ) )/( parseInt( nb_share_A )+parseInt( buy_amount ) ) ):0;
        nb_share_A += parseInt( buy_amount );
        nb_points -= ( buy_amount*share_A_value );
        tick();
    }
}
function buy_B(){
    /*save();*/
    if( nb_points>=share_B_value && share_B_value > 0){
        let buy_amount = 0; 
        do{
            buy_amount=prompt( "You will buy shares.\nHow many do you wanna buy ?\n( Your point's amount allow you to buy "+Math.floor( nb_points/share_B_value )+". )" );
        }while( ( buy_amount*share_B_value )>nb_points || buy_amount<0 || !IaN( buy_amount ) );
        avg_share_B_value = ( nb_share_B+buy_amount )!=0?( ( ( nb_share_B * avg_share_B_value )+( buy_amount*share_B_value ) )/( parseInt( nb_share_B )+parseInt( buy_amount ) ) ):0;
        nb_share_B += parseInt( buy_amount );
        nb_points-=( buy_amount*share_B_value );
        tick();
    }
}
function sell_A(){
    if( nb_share_A>0 ){
        let sell_amount = 0;
        do{
            sell_amount = prompt( "You will sell shares.\nHow many do you wanna sell ?\n( Your share's amount allow you to sell "+nb_share_A+". )" )
        }while( sell_amount > nb_share_A || sell_amount < 0 || !IaN( sell_amount ) );
        nb_share_A -= sell_amount;
        nb_points+=( sell_amount * share_A_value );
        tick();
    }
}
function sell_B(){
    if( nb_share_B>0 ){
        let sell_amount = 0;
        do{
            sell_amount = prompt( "You will sell shares.\nHow many do you wanna sell ?\n( Your share's amount allow you to sell "+nb_share_B+". )" )
        }while( sell_amount > nb_share_B || sell_amount < 0 || !IaN( sell_amount ) );
        nb_share_B -= sell_amount;
        nb_points+=( sell_amount * share_B_value );
        tick();
    }
}
function pay_debt(){
    if ( nb_points>=Math.ceil( interets*nb_debt ) && nb_debt>0 ){
        nb_points-=Math.ceil( interets*nb_debt );
        nb_debt = 0;
        tick();
    }
}
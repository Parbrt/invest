

let nb_points ;
let nb_debt;
let done1 ;
let txt_points ;
let avg_share_value;

const base_value = 10000;
let last_last_last_value ;
let last_last_value ;
let last_value;
let interets=2;
let minf_value = [0,0,0,0,0,0,0,0,0,0];

let nb_share = 0;
let share_value =Math.floor(last_value/(base_value/10));
init();
setInterval(tick(),2000);
function init(){
    if(get_cookie("mon_prenom")!=""){
        nb_points = get_cookie("nb_points")!=""?(parseInt(get_cookie("nb_points"))):parseInt(0);
        nb_debt = get_cookie("nb_debt")!=""?(parseInt(get_cookie("nb_debt"))):parseInt(0);
        done1 = true;
        last_last_last_value =get_cookie("last_last_last_value")!=""?parseInt(get_cookie("last_last_last_value")):parseInt(base_value);
        last_last_value = get_cookie("last_last_value")!=""?parseInt(get_cookie("last_last_value")):parseInt(base_value);
        last_value = get_cookie("last_value")!=""?parseInt(get_cookie("last_value")):parseInt(base_value);

        avg_share_value=get_cookie("avg_share_value")!=""?(parseFloat(get_cookie("avg_share_value"))):parseInt(0);
        interets=get_cookie("interets")!=""?(parseInt(get_cookie("interets"))):parseInt(2);
        nb_share = get_cookie("nb_share")!=""?(parseInt(get_cookie("nb_share"))):parseInt(0);
        share_value =Math.floor(last_value/(base_value/10));
        txt_points = "Nombre de points de "+get_cookie("mon_prenom")+":";
        tick();
    }else{
        nb_debt = 0;
        nb_points = 0;
        done1 = false;
        txt_points = "Nombre de points:";
        avg_share_value=0;
        last_last_last_value = base_value;
        last_last_value = last_last_last_value;
        last_value = last_last_value;
        
    }
    tick();
}
function IaN(value){
    if (value  == null || value == NaN || value == ""){
        return false;
    }else{
        return true;
    }
}
function get_cookie(cname) {
    let name = cname + "=";
    let decoded_cookie = decodeURIComponent(document.cookie);
    let splited = decoded_cookie.split(';');
    for(let i = 0; i <splited.length; i++) {
      let c = splited[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
function deleteAllCookies() {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}
function restart(){
    deleteAllCookies();
    location.reload(true);
}
function tick(){
    if (nb_points<0){
        nb_debt -=nb_points;
        nb_points = 0;
    }
    hold();
    document.getElementById("nb_points").innerHTML = nb_points;
    document.getElementById("txt_points").innerHTML = txt_points;
    
    document.getElementById("nb_debt").innerHTML = nb_debt;
    document.getElementById("amount_to_pay").innerHTML = Math.ceil(nb_debt*interets);
    document.cookie = "interets=" + parseInt(interets);
    document.cookie = "nb_points="+parseInt(nb_points);
    document.cookie = "nb_debt="+parseInt(nb_debt);
    document.cookie = "nb_share="+parseInt(nb_share);
    if (nb_points >=Math.ceil(nb_debt*interets) && nb_debt != 0){
        alert("Vous devriez rembourser vos dettes !")
    }
}
function roll_dice(){
    return Math.floor(Math.random()*6)+1;
}
function ex1(){
    /*save();*/
    alert("Bonjour"+(get_cookie("mon_prenom")!=""?(" "+get_cookie("mon_prenom")):"")+" !");
    if(!done1){
        nb_points ++;
    }
    tick();
    done1 = true;
}
function ex2(){
    /*save();*/
    let mon_prenom=prompt('Quel est votre prénom ?')
    document.cookie = "mon_prenom="+mon_prenom;
    alert("Je m'appelle \""+ mon_prenom+"\"");
    txt_points = "Nombre de points de "+mon_prenom+" :";
    tick();
}
function ex3(){
    /*save();*/
    let sommeDepart=prompt('Quel est la somme de départ (entre 0 et 200) ?');

    if (sommeDepart>=0 && sommeDepart<=200){
        let somme=sommeDepart
        let billets=[100,50,20,10,5,2,1,0.5,0.1,0.05,0.02,0.01];
        
        let rendu=[];
        let alertOutput ="Il faut "
        for (let k=0; k<length(billets); k++) {
            rendu.append(0);
        }
        let i=0;
        while (i<billets.length && somme>=billets[i]) {
            somme=somme-billets[i];
            rendu[i]++;
        }
        for (let j=0; j<billets.length; j++) {
            if (rendu[j]!=0) {
                alertOutput+="rendu[j] billet"+billets[j]!=1 ? "s " : " " + "de " + billets[j] + ", ";
            }
        }
        alertOutput+="svp."
        
    }else{
        let alertOutput = sommeDepart + " n'est pas compris entre 0 et 200 !";
    }

    alert(alertOutput);
    tick();
}
function ex4(){
    /*save();*/
    let age = prompt("age ?");
    const floor_ages = [0,9,11,13,15,17,21];
    const cat_names = ["Vous ne jouez pas.","Poussin","Benjamin","Minime","Cadet","Junior","Sénior"];
    let i=floor_ages.length-1;
    let cat_name = cat_names[i];
    while (age<floor_ages[i]){
        i--;
        cat_name = cat_names[i];
    }
    alert(cat_name!="Vous ne jouez pas."?("Vous allez jouer en " + cat_name) : cat_name);
    tick();
}
function ex5(){
    /*save();*/
    let rand_num = Math.floor(Math.random()*20)+1;
    let nb_guess = 4
    let guess ;
    let flag = false;
    let status = "0"
    while(nb_guess>0){
        guess = prompt("Essayez un nombre (entre 0 et 20)"+(status=="0"?"":(" "+(status=="+"?"plus grand":"plus petit")))+".\n" + (nb_guess>1?(nb_guess+" essais restants."): "Dernier essai !"));
        if (guess == rand_num){
            alert("gagné !\n"+rand_num);
            flag = true;
            nb_points +=nb_guess;
            break;
        }else if (guess < rand_num){
            status = "+"
        }else{
            status = "-"
        }
        nb_guess --;
    }
    if (!flag){
        alert("Perdu !\nLe nombre était "+rand_num+".");
        nb_points--;
    }
    tick();
}
function jeu_du_cochon(){
    /*save();*/
    if (nb_points >0){
        let mise=0;
        
        do{
            mise = prompt("Combien misez vous ?\n(La mise doit etre <= "+nb_points+".)");
        }while(mise > nb_points || !IaN(mise));
        let win=jeu();
        if(win){
            alert("Vous avez gagné !\nVous gagnez "+mise+" points.");

            nb_points+=parseInt(mise);
        }else{
            alert("Perdu !")
            nb_points-=parseInt(mise);
        }        
    }
    tick();

}
function jeu(){
    let player1_score = 0;
    let player2_score = 0;
    while(player1_score<100 && player2_score<100){
        alert("Vous : "+player1_score+"\nLe bot : "+player2_score+"\nA vous !");
        player1_score = parseInt(tour_de_jeu(player1_score));
        if (player1_score>=100){
            break;
        }
        alert("Vous : "+player1_score+"\nLe bot : "+player2_score+"\nAu tour du bot !");
        player2_score = parseInt(tour_de_jeu_bot(player2_score,player1_score));
        

    }
    if(player1_score>=100){
        return true;
    }else{
        return false;
    }

}
function bot_keep_playing(win){
    let rand_num = Math.random();
    let cap = 0.5
    if (win){
        cap = 0.8
    }else{
        cap = 0.1
    }
    if(rand_num < cap){
        return false;
    }else{
        return true;
    }
}
function tour_de_jeu_bot(bot_score,player_score){
    let dice_1;
    let dice_2;
    let temp_score=0;
    let keep_playing=true;
    let flag=false;
    while(keep_playing){
        dice_1 = roll_dice();
        dice_2 = roll_dice();
        alert(dice_1+"\n"+dice_2);
        if (dice_1 == 1 || dice_2 == 1) {
            temp_score = 0;
            flag = true;
            break
        }else{
            temp_score += dice_1 + dice_2;
            keep_playing = bot_keep_playing((bot_score + temp_score)>player_score);
        }
        
    }
    if (!flag){
        bot_score += temp_score;
    }
    return bot_score;

}
function tour_de_jeu(player_score){
    let popup_state = true;
    let temp_score=0;
    let flag = false;
    let dice_1;
    let dice_2;
    while(popup_state){
        dice_1 = roll_dice();
        dice_2 = roll_dice();
        if (dice_1 == 1 || dice_2 == 1) {
            temp_score = 0;
            alert(dice_1+"\n"+dice_2+"\n\n Pas de points  ce tour ci !");
            flag = true;
            break
        }else{
            temp_score += dice_1 + dice_2;
            popup_state = confirm(dice_1+"\n"+dice_2+"\n\n"+temp_score);
        }
    }
    if (!flag){
        player_score += temp_score;
    }
    return player_score;
}
function gambling(){
    /*save();*/
    if (nb_points >0){
        let mise;
        do{
            mise = prompt("Combien misez vous ?\n(La mise doit etre <= "+nb_points+".)");
        }while(mise>nb_points || mise<0 || !IaN(mise));
        let rand1 = Math.floor(Math.random()*10)+1;
        let rand2 = Math.floor(Math.random()*10)+1;
        let rand3 = Math.floor(Math.random()*10)+1;
        alert("-"+rand1+"-"+rand2+"-"+rand3+"-");
        if (rand1 == rand2 && rand1==rand3) {
            alert("Gagné !");
            nb_points+=4*mise;
        }else if (rand1==rand2 || rand1==rand3 ||rand2==rand3) {
            alert("Gagné !");
            nb_points+=2*mise;
        }else{
            alert("Perdu !");
            nb_points-=mise;
        }
    }
    tick();
}
function hold(){
    let rand = Math.random();
    let rand2 = Math.random();
    let rand3 = Math.random()*0.2;
    let amp =1
    let cap = 0.5
    let new_value;
    let fact = 1;
    if (last_value > last_last_value){
        cap = cap>0.75?cap:0.75;
    }else if ((last_last_last_value < last_last_value && last_last_value<last_value) || last_value <base_value/3){
        cap = cap<0.1?cap:0.1;
    }else{

        cap = cap<0.25?cap:0.25;
    }
    if (last_value < base_value && last_last_value < base_value && last_last_last_value < base_value) {
        amp +=0.5;
        cap -=0.05
        if (amp > 3){
            amp = 3;
        }
    }else{
        amp -=0.01;
        cap +=0.05;
        if (amp<1){
            amp =1;
        }
    }
    if (cap>rand){
        fact = 1 - (rand2*rand3);
    }else{
        if(cap==0.1){
            fact = 1 + (rand2*0.5);
        }else{
            fact = 1 + (rand2*rand3);
        }
    }
    new_value = parseInt(last_value * fact);
    up_down_management(new_value);
    document.getElementById("var_fun").innerHTML = new_value;
    share_value =Math.floor(new_value/1000);
    document.getElementById("share_value").innerHTML = share_value;
    avg_share_value=nb_share==0?0:avg_share_value;
    document.getElementById("nb_share").innerHTML = nb_share;
    document.getElementById("avg_share_value").innerHTML = Math.round(((avg_share_value==0?0:share_value)-avg_share_value)*10)/10
    last_last_last_value = last_last_value
    last_last_value = last_value;
    last_value = new_value;
    document.cookie = "avg_share_value="+parseFloat(avg_share_value);
    document.cookie="last_last_last_value="+last_last_last_value;
    document.cookie="last_last_value="+last_last_value;
    document.cookie="last_value="+last_value;
}
function up_down_management(new_value){
    let text ="";
    for (i=0; i<minf_value.length; i++){
        if (i!=(minf_value.length-1)){
            minf_value[i]=minf_value[i+1];
        }else{
            minf_value[i]=last_value;
        }
    }
    const xValues = [-9,-8,-7,-6,-5,-4,-3,-2,-1,0];
    const constValue=avg_share_value*(base_value/10);
    new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: minf_value,
                borderColor: "red",
                fill: true
            },{
                
                data: [constValue,constValue,constValue,constValue,constValue,constValue,constValue,constValue,constValue,constValue],
                borderColor: "green",
                fill: false
            }]
            
        },
        options: {
            legend: {display: false}
            ,scales: {
                yAxes: [{ticks: {min: 1000, max:(last_value<20000? 25000:last_value+1000)}}],
              }
        }
    });
}
function buy(){
    /*save();*/
    if(nb_points>=share_value){
        let buy_amount = 0; 
        do{
            buy_amount=prompt("Vous êtes sur le point d'acheter des actions.\nCombien en voulez-vous ?\n(Votre nombre de point vous permet d'en acheter "+Math.floor(nb_points/share_value)+".)");
        }while((buy_amount*share_value)>nb_points || buy_amount<0 || !IaN(buy_amount));
        avg_share_value = (nb_share+buy_amount)!=0?(((nb_share * avg_share_value)+(buy_amount*share_value))/(parseInt(nb_share)+parseInt(buy_amount))):0;
        nb_share+=parseInt(buy_amount);
        nb_points-=(buy_amount*share_value);
    }
    tick();
}
function sell(){
    /*save();*/
    if(nb_share>0){
        let sell_amount = 0;
        do{
            sell_amount = prompt("Vous êtes sur le point de vendre des actions.\nCombien voulez-vous en vendre ?\n(Votre nombre d'action vous permet d'en vendre "+nb_share+".)")
        }while(sell_amount > nb_share || sell_amount < 0 || !IaN(sell_amount));
        nb_share-=sell_amount;
        nb_points+=(sell_amount * share_value);
    }
    tick();
}
function pay_debt(){
    if (nb_points>=Math.ceil(interets*nb_debt)){
        nb_points-=Math.ceil(interets*nb_debt);
        nb_debt = 0;
    }
    tick();
}
up_down_management(last_value);

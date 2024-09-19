function calcolaMerito(sus,sdb){
    sogliaminimaCM=7777;
    if (mp[0]!=0) 
		m0=mCaratteriNelloStessoOrdineDalPrimoInPoi(sus,sdb);
    else
		m0=0;
    if (mp[1]!=0) 
		m1=mNumeroDiCaratteriNelloStessoOrdine(sus,sdb);
    else
		m1=0;
    if (mp[2]!=0) 
		m2=mLaStringaCompletaSenzaBlank(sus,sdb);            
    else
		m2=0;
    if (mp[3]!=0)
		m3=mUnaOPiuParoleComplete(sus,sdb);                    
    else
		m3=0;
    if (mp[4]!=0) 
		m4=mNumeroDiCaratteriInizialiDisordinati(sus,sdb);
    else
		m4=0;
    if (mp[5]!=0)
		m5=mNumeroDiCaratteriInizialiOrdinati(sus,sdb);          
    else
		m5=0;
    if (mp[6]!=0) 
		m6=mSottostringaVariabileDi3ordinate(sus,sdb);
    else
		m6=0;

    mm=(m0*mp[0]+m1*mp[1]+m2*mp[2]+m3*mp[3]+m4*mp[4]+m5*mp[5]+m6*mp[6]);
    
    if (mm>=sogliaminimaCM){
        testoAgg=document.createTextNode(''+mm+' = merito di <'+sus+'> per il Bene <'+sdb+''+''+mp+'>\n'+
           '0 - mCaratteriNelloStessoOrdineDalPrimoInPoi <'+(m0*10)/10+'con merito'+mp[0]+'>\n'+
           '1 - mNumeroDiCaratteriNelloStessoOrdine      <'+(m1*10)/10+'con merito'+mp[1]+'>\n'+
           '2 - mLaStringaCompletaSenzaBlank             <'+(m2*10)/10+'con merito'+mp[2]+'>\n'+
           '3 - mUnaOPiuParoleComplete                   <'+(m3*10)/10+'con merito'+mp[3]+'>\n'+
           '4 - mNumeroDiCaratteriInizialiDisordinati    <'+(m4*10)/10+'con merito'+mp[4]+'>\n'+
           '5 - mNumeroDiCaratteriInizialiOrdinati       <'+(m5*10)/10+'con merito'+mp[5]+'>\n'+
           '6 - mSottostringaVariabileDi3ordinate        <'+(m6*10)/10+'con merito'+mp[6]+'>\n');
        paragrafo.appendChild(testoAgg);
    }
	return(mm);
};
//----------------------------------------------------------------------------
function mSottostringaVariabileDi3ordinate(sus,sdb){
	mm=0;
    if (sus.length<=3 || sdb.length<=3) 
		return (0);
    susl=sus.toLowerCase();
	str2=sdb.toLowerCase();
    for (i=0; i<=susl.length-2; i++){ 
        str1=susl.substring(i,i+3);
        ip=str2.indexOf(str1);
        //print('cerco',str1, 'in ',str2,' mi restituisce ',ip)
        if (ip>=0){
            mm=mm+1;
            str2=str2.substr(ip+1);
            if (str2.length<3){ // Esce per fine del record Bene
                mmm=mm*3;
                if (mmm>10){
				mmm=10;
                return(mmm);
				};
			};
		};
        continue;
	}; 
    mmm=mm*3;
    if (mmm>10){
		mmm=10;
	};
	return(mm);
};
//----------------------------------------------------------------------------
function mNumeroDiCaratteriInizialiOrdinati(sus,sdb){
    suslr=(sus.toLowerCase()).replace(' ','');     // qui i blank vanno levati !!
    sdbls=(sdb.toLowerCase()).split(' ');             // qui i blank servono per split !
    mm=0; 
	ffrom=0; 
	tto=0;
    while (2==2){
        cc = suslr[ffrom]; 
		xx=  sdbls[tto][0];
        if (cc == xx){
            mm=mm+1;
			ffrom=ffrom+1;
			tto=tto+1;
            mmm=10*mm/suslr.length;
            if (ffrom >=suslr.length)
				return(mmm);
            if (tto  >= sdbls.length)  
				return(mmm);
		}
        else{
            tto=tto+1;
            if (tto  >= sdbls.length)  
				return(10*mm/suslr.length);
		};
	};
    return (mm); // restituisce num.char che sono caratteri di inizio parola
};
//---------------------------------------------------------------------------- 
function mNumeroDiCaratteriInizialiDisordinati (sus,sdb){        
    suslr=(sus.toLowerCase()).replace(' ','');    // qui i blank vanno levati !!
    sdbls=(sdb.toLowerCase()).split(' ');             // qui i blank servono per split !
    mm=0;        
    for(cc in suslr){
        for (ixx=0;ixx<sdbls.length;ixx++){
            xx=  sdbls[ixx][0];
            //print ('provo ',cc,'con',xx, sdbls)
            if (cc == xx){
                mm=mm+1; 
                sdbls.splice(ixx,1);     // remove by index
                //print('trovato - per ora sono',mm,sdbls,len(sdbls))
                if (sdbls.length== 0) 
					return(10*mm/suslr.length);
                // restituisce 10*num.char che sono inizio parola ...
                // ... rispetto al numero d caratteri di sus (senza blank)
                break;  // vai al prossimo cc
			};
		};
        continue;
	};
    return(10*mm/suslr.length);
    return (0);
};
//----------------------------------------------------------------------------
function mUnaOPiuParoleComplete(sus,sdb){                // MERITO n.3
    lungtot=0;
	lungtotma=0;
    susl=sus.toLowerCase();
	sdbl=sdb.toLowerCase();
    suslparole=susl.split(' ');
	sdblparole=sdbl.split(' ');
    for (suslparola in suslparole){
        lungtot=lungtot+suslparola.length;     // lungh.totale parole com match
        if (sdblparole.includes(suslparola))  
            lungtotma=lungtotma+suslparola.length;     // lungh.tot. delle parole
	};
    return (10*lungtotma/lungtot);
};
//----------------------------------------------------------------------------
function mLaStringaCompletaSenzaBlank(sus,sdb){          // MERITO n.2
    mm=0; 
	susl=(sus.toLowerCase()).replace(' ','');
    sdbl=(sdb.toLowerCase()).replace(' ','');
    if (sdbl.includes(susl)){
    // restituisce 0 se la stringa non c'è
    // ... se c'è un numero da 1 a 10 a seconda della lunghezza di sus
        if (sus.length==1) 
			return 1;
        if (sus.length==2) 
			return 3;
        if (sus.length==3) 
			return 6;
        if (sus.length>=4) 
			return 10;
	};
    return(0);
};
//----------------------------------------------------------------------------
function mNumeroDiCaratteriNelloStessoOrdine (sus,sdb){  // MERITO n.1
    susl=sus.toLowerCase();            // qui i blank servono !!
    sdbl=sdb.toLowerCase();            // qui i blank servono 
    mm=0; 
	ffrom=0; 
	tto=0; 
	savetto=tto;
    while (2==2){
        if (susl[ffrom] == sdbl[tto]){
            mm=mm+1; 
			ffrom=ffrom+1; 
			tto=tto+1; 
			savetto=tto;
		}
        else{
            tto=tto+1;
            if (tto  >= sdbl.length){
                ffrom=ffrom+1; 
				tto=savetto;
			};
		};
        if (ffrom >=susl.length)  
			return(10*mm/sus.length);
        if (tto  >= sdbl.length) 
			return(10*mm/sus.length);           
    // Se un carattere non esiste, continua:
    // ver in verde>3, vez in verde>2, zer in verde>2
    // La risposta è asimmetrica se il primo errore è in cima o in fondo
    // restituisce valori da 0 a 10 a seconda di ...
    // quanti caratteri trova rispetto a quelli che ha
	};
    mmm=10*mm/sus.length;
    return (mmm);        // restituisce valori da 0 a 10
};
//----------------------------------------------------------------------------
function mCaratteriNelloStessoOrdineDalPrimoInPoi(sus,sdb){  // MERITO n.0
    mm=0; 
	susl=sus.toLowerCase(); 
	sdbl=sdb.toLowerCase(); 
	ffrom=0;
    for (cc in susl){
        pp=sdbl.indexOf(cc,ffrom);
        if (pp<0) 
			break;
        else{
			mm=mm+1; 
			ffrom=pp+1;
		};
    // Al primo carattere non esistente, esce per cui:
    // ver in verde=>3, vez in verde=>2, zer in verde=>0
    // La risposta è asimmetrica se il primo errore è in cima o in fondo
    // "mm" mi dice quanti caratteri
    // restituisce valori da 0 a 10 a seconda di ...
    // quanti caratteri trova rispetto a quelli che ha
	};
    mmm=10*mm/sus.length;
    return (mmm);        // restituisce valori da 0 a 10    
};
/*==========================================================================
 --------------------------------------------------------------------------
 ----------    ROUTINE DI PREPARAZIONE AL CALCOLO DEL MERITO     ----------
 ----------      Valida Comando e calcola pesi dei meriti        ----------
 --------------------------------------------------------------------------
 ==========================================================================*/
 function validaComando(aa,RS,numRS){    // valida comando utente/imposta parametri
    // In caso di errore NON modificare RS,numRS, altrimenti ...
    // ... RS e numRS vengono cambiate
    maxStra=3; 
	maxReg=6;                 // INSERIRE VALORI AGGIORNATI
    // le strategie (s) vanno da indice 0 a indice maxStra  (sono 4)
    // le regole (r)    vanno da indice 0 a indice maxReg   (sono 6)
    z1=aa.indexOf('--');
    if (z1==0) 
		return [1,aa,RS,numRS];    // ERR.  stringa aa inizia con '--'

    zsin=aa.substring(0,z1);
	zdes=aa.substring(z1);
	zdess=zdes.substring(2);  // qwe--r2 > qwe | --r2 | r2

    if (zdess.length<2) 
		return [1,aa,RS,numRS];  // ERRORE: dopo '--' >= 2 char
    zd1=zdess[0];
	zd2=zdess.substring(1);          // zd1='r'; zd2='2'
    if (!(/\d/.test(zd2))) 
		return [1,aa,RS,numRS];  // ERRORE: dopo '--x' num
    ozd1='rs';
    if (!(ozd1.includes(zd1.toLowerCase())))
		return [1,aa,RS,numRS];   // ERRORE: non è s/r

    num=Number(zd2);
    if (zd1.toLowerCase()=='r' && num<=maxReg)
		return [0,zsin,'r',num];
    else if (zd1.toLowerCase()=='s' && num<=maxStra)
		return [0,zsin,'s',num];
    else  
	    return [1,zdes,RS,numRS]; // ERRORE: num Stra o Reg errato 
    return [1,'aaaaaaaa',RS,numRS];   // Qui non dovrebbe passare mai
};
//----------------------------------------------------------------------------
function calcolamp(a,RS,numRS){      // Calcola pesi dei meriti di una trategia 
    // m0=mCaratteriNelloStessoOrdineDalPrimoInPoi(sus,sdb)    # POSIZIONE 0
    // m1=mNumeroDiCaratteriNelloStessoOrdine (sus,sdb)        # POSIZIONE 1
    // m2=mLaStringaCompletaSenzaBlank(sus,sdb)                # POSIZIONE 2
    // m3=mUnaOPiuParoleComplete(sus,sdb)                      # POSIZIONE 3
    // m4=mNumeroDiCaratteriInizialiDisordinati(sus,sdb)       # POSIZIONE 4
    // m5=mNumeroDiCaratteriInizialiOrdinati(sus,sdb)          # POSIZIONE 5
    // m6=mSottostringaVariabileDi3ordinate (sus,sdb)          # POSIZIONE 6
    mp0=[   [1,1,1,1,1,1,1],        // strategia 0 : sono tutti uguali
            [1,2,3,4,5,6,7],        // strategia 1 : sono in sequenza PROVA
            [2,4,6,8,10,12,14],     // strategia 2 : come prec x 2    PROVA
            [1,2,4,8,2,3,8]         // strategia 3 : privilegia parole           
        ];
    if  (RS=='s')
        for (i=0; i<7; i++)
			mp[i]=mp0[numRS][i];
    else if (RS=='r'){
        for (i=0; i<7; i++) 
			mp[i]=0;
        mp[numRS]=1;
	};
    return ;
};
/*#---------------------------------------------------------------------------
# ==========================================================================
# --------------------------------------------------------------------------
# ----------             ROUTINE DI SUPPORTO A MAIN               ----------
# --------------------------------------------------------------------------
# ==========================================================================*/
function stampa(daStampare){
    if (daStampare == 'apertura'){
        testoAgg=document.createTextNode('Ident. di un BENE da un insieme, tramite una stringa');
        paragrafo.appendChild(testoAgg);
        paragrafo.appendChild(document.createElement('br'));
        testoAgg=document.createTextNode("Il file usato per i dati dei Beni è");
        paragrafo.appendChild(testoAgg);
        paragrafo.appendChild(document.createElement('br'));
        //print ("Poi legge stringhe da console e fornisce valori - in loop")
        //print ('ATTENZIONE - La finestra di ricerca file potrebbe restare',
        //       ' nascosta da altre finestre !')
	};
    //---------------------------------- COME GIUSTIFICARE IL TESTO?
    if (daStampare == 'elencoDeiBeni'){
        testoAgg=document.createTextNode('\n Ci sono '+numBeni+' Beni. Lunghezza massima '+maxchar);
        paragrafo.appendChild(testoAgg);
        paragrafo.appendChild(document.createElement('br'));
        for (i=0; i<numBeni; i++)
            aaa= String(i)+' - '+String(liastam[i])+' - '+String(listaB[i])+' '+String(listaBST[i])+' '+String(listaBS[i]);
            //aaa= ((str(i).rjust(3))+' - '+str(listam[i]).rjust(5)+
            //' - '+listaB[i].ljust(maxchar)+' '+listaBST[i].ljust(12)+
            //' '+listaBS[i].ljust(20))
	};
    //---------------------------------- COME GIUSTIFICARE IL TESTO?
    if (daStampare == 'strategia'){
        if (RS=='r'){
            testoAgg=document.createTextNode('Adottata REGOLA num'+elencoRegole[numRS]+
                   ' con peso '+mp[numRS]);
            paragrafo.appendChild(testoAgg);
            paragrafo.appendChild(document.createElement('br'));
        }
        else if (RS=='s'){
            testoAgg=document.createTextNode('Adottata STRATEGIA num'+numRS+'coi seguenti pesi:');
            paragrafo.appendChild(testoAgg);
            paragrafo.appendChild(document.createElement('br'));
            for (i=0; i<7; i++)
                if (mp0[numRS][i]!=0){
                    testoAgg=document.createTextNode(i+' - '+elencoRegole[i]+
                           ' con peso '+mp0[numRS][i]);
                   paragrafo.appendChild(testoAgg);
                   paragrafo.appendChild(document.createElement('br'));    
                }
		};
        testoAgg=document.createTextNode('------------------------------------------------------------');
        paragrafo.appendChild(testoAgg);
        paragrafo.appendChild(document.createElement('br'));
	};
    //---------------------------------- COME GIUSTIFICARE IL TESTO?
    if (daStampare=='listaBeni'){ // Stampa la lista dei Beni selezionati
    // usa la variabile mpmaxprint che indica il merito minimo per stampare
        numsoprasoglia=0;
        for (i=0; i<numBeni; i++)
            if (lm[i]>=mpmaxprint)
				numsoprasoglia=numsoprasoglia+1;
        if (numsoprasoglia>0){
            for (i=0; i<numBeni; i++)
                if (lm[i]>=mpmaxprint){
                    //bbb= (String(lm[i])+' - '+lB[i]+' '+lBST[i]+' '+lBS[i]);
                    RisultatiRicerca.push(lB[i]);
                //if lm[i]>=mpmaxprint:
                //testoAgg=document.createTextNode(bbb.trim());    // evitare stampa con doppia riga
                //paragrafo.appendChild(testoAgg);
                //paragrafo.appendChild(document.createElement('br'));
				};
        }					
        else{
            //testoAgg=document.createTextNode('Eseguita ricerca con stringa <'+a+
              //'> - NON ci sono Beni con merito >= di '+mpmaxprint);
              //paragrafo.appendChild(testoAgg);
              //paragrafo.appendChild(document.createElement('br'));
            return "No Campi";
            }
	};
    return ;
};
//----------------------------------------------------------------------------
function inizializzaDati(){        
    for (i=0; i<7; i++)
		mp.push(1);
    elencoRegole.push('CaratteriNelloStessoOrdineDalPrimoInPoi');
    elencoRegole.push('NumeroDiCaratteriNelloStessoOrdine');
    elencoRegole.push('LaStringaCompletaSenzaBlank');
    elencoRegole.push('UnaOPiuParoleComplete');
    elencoRegole.push('NumeroDiCaratteriInizialiDisordinati');
    elencoRegole.push('NumeroDiCaratteriInizialiOrdinati');
    elencoRegole.push('mSottostringaVariabileDi3ordinate');
};
//---------------------------------------------------------------------------- 
//function leggiFileBeni(){
    // legge il file dei Beni e carica dati in listaB, listaBST, listaBS
    // inizializza (listameriti) listam a 0
    //fBI=open(fileBeniId);
    //riga=fBI.readline();
    //riga=riga.replace('\n',''); //riga.rstrip('\n')  #
    //print(riga,len(riga))
    
	// while (riga != ""){
    //    riga = fBI.readline();   
	//	riga=riga.replace('\n',''); //riga.rstrip('\n')
	//};
    //fBI.close();
    //return ;
//};
//----------------------------------------------------------------------------
function benePiuLung(){
    maxchar=1;
    for (i=0; i<numBeni; i++)
        //listam[i]=0   # gia fatto
        if (listaB[i].length>maxchar)
			maxchar=listaB[i].length;
    return (maxchar);
};
//----------------------------------------------------------------------------
function ordinaDaListeInL(){
    // CREA in lB,lBST,lBS,lm lista ordin. di listaB,listaBST,listaBS,listam
    lB.length=0; 
	lBST.length=0; 
	lBS.length=0; 
	lm.length=0;

    mermax=-1; 
	ii=0;
    for (i=0; i<numBeni; i++)
        if (listam[i]>mermax){
			mermax=listam[i]; 
			ii=i;
		};
    //trovato il massimo in listam alla posizione ii
    // ora sceglie per merito e mette in "l" = liste di lavoro
    // criterio di ordinamento con efficienza schifosa - pazienza
    while (mermax>=0){    // 'ii' ora è l'indice di chi ha merito max
        lB.push(listaB[ii]);
		lBST.push(listaBST[ii]);
        lBS.push(listaBS[ii]);
		lm.push(listam[ii]);
        listam[ii]=-1000-listam[ii];
        mermax=-1; 
		ii=0;
        for (i=0; i<numBeni; i++)
            if (listam[i]>mermax){
				mermax=listam[i]; 
				ii=i;
			};
	};
    return ;
};
/*#---------------------------------------------------------------------------
# ==========================================================================
# --------------------------------------------------------------------------
# ----------                        MAIN                          ----------
# --------------------------------------------------------------------------
# ==========================================================================*/
//!/usr/bin/python
// -*- coding: latin-1 -*-
// -*- coding: utf-8 -*-
//import os, sys, string, time, random; GAB
// --------------------------------------------------------------------------
// Scegli il file di ingresso - Commenta le istruzioni 
//fileBeniId=os.getcwd()+"\\Topo2TAB1.txt"         # un solo record
//fileBeniId=os.getcwd()+"\\Topo2TAB15.txt"        # 15 record
//fileBeniId=os.getcwd()+"\\Topo2TABtutto.txt";    // 11500 record GAB
// --------------------------------------------------------------------------
//var paragrafo= document.getElementById('Messaggi');
//var testoAgg;
//stampa('apertura');
// --------------------------------------------------------------------------
//# Definizione dati
listaB=[]; 
listaBST=[]; 
listaBS=[]; 
listam=[];
lB=[];     
lBST=[];     
lBS=[];     
lm=[];
mp=[]; 
elencoRegole=[];
var mp0;
var aa;
var RC,a,RS,numRS;
var numBeni;
// --------------------------------------------------------------------------
inizializzaDati();
var RS; //='s'
var numRS; //=3            // All'inizio si usa Strategia 3  
// --------------------------------------------------------------------------
// Scelte di DEBUG
var voglioListaBeni=false;
// --------------------------------------------------------------------------
var RisultatiRicerca=[];
// --------------------------------------------------------------------------
// ----------                   LOOP PRINCIPALE                    ----------
// --------------------------------------------------------------------------

//Leggo il file dei beni 
function QUASI(comando,file){
        for (var line = 0; line < file.length - 1; line++) {
            riga=file[line].replace('\n','');
            rigas=riga.split('\t');
            listaB.push(rigas[1]);
            listaBST.push(rigas[0]);
            listaBS.push(rigas[2]);
            listam.push(0); 
        };
    prendicomando(comando);
    return RisultatiRicerca;
};
/*var reader = new FileReader();
    reader.onload = function () {
        var lines = this.result.split(/\r\n|\n/);
        for (var line = 0; line < lines.length - 1; line++) {
            riga=lines[line].replace('\n','');
            rigas=riga.split('\t');
            listaB.push(rigas[1]);
            listaBST.push(rigas[0]);
            listaBS.push(rigas[2]);
            listam.push(0); 
        };  
    };
    reader.readAsText(file);

document.getElementById("file").onchange =  function () {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function (progressEvent) {
        var lines = this.result.split(/\r\n|\n/);
        for (var line = 0; line < lines.length - 1; line++) {
            riga=lines[line].replace('\n','');
            rigas=riga.split('\t');
            listaB.push(rigas[1]);     
            listaBST.push(rigas[0]);
            listaBS.push(rigas[2]);
            listam.push(0);  
          }
    };
    reader.readAsText(file);
};*/
function prendicomando(comando){
    numBeni=listaB.length;
    maxchar=benePiuLung();                    
    //if (voglioListaBeni==true) 
	   // stampa('elencoDeiBeni');
    //testoAgg=document.createTextNode('\n------------------------------------------------------------');
    //paragrafo.appendChild(testoAgg);
    aa=comando;
    [RC,a,RS,numRS]=validaComando(aa,RS,numRS);
// restituisce stringa di ricerca, Strategia o Regola, num. strategia/regola
    if (RC==0){                       // Se la stringa è comando corretta ...
    //-----------------------------------------------------------------------
        calcolamp(a,RS,numRS);      // va a modificare tabella meriti (global)
        mpmax=0; 
		numNoZero=0;
        for(ib=0; ib<numBeni; ib++){
            mib=calcolaMerito(a,listaB[ib]);       // CUORE DELL'ALGORITMO
            listam[ib]=mib;
            if (mib>mpmax) 
				mpmax=mib;
		};
        ordinaDaListeInL();
        //stampa('strategia');
        mpmaxprint=(mpmax+1)/2;
        stampa('listaBeni');
        return RisultatiRicerca;
	}	
    //-----------------------------------------------------------------------   
    else if (RC==1){
        return ("Errore");
        //testoAgg=document.createTextNode('ERRORE nella stringa di comando . riprova\n>');
        //paragrafo.appendChild(testoAgg);
	}
//---------------------------------------------------------------------------
//};
};
/*
# VERIFICHE
riga=fBI.readline();  riga=riga.replace('\n','') #riga.rstrip('\n')  #
VERIFICARE perchè replace funziona e rstrip invece NO

*/

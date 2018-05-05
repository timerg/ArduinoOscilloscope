#include "Setup.h"

void adcSetup(){
  pinMode(1, INPUT);
  sbi(DIDR0,ADC5D);
  sbi(DIDR0,ADC4D);
  sbi(DIDR0,ADC3D);
  sbi(DIDR0,ADC2D);
  sbi(DIDR0,ADC1D);
  sbi(DIDR0,ADC0D);
  
//ADMUX
  cbi(ADMUX, REFS1);
  sbi(ADMUX, REFS0);
  
  sbi(ADMUX, ADLAR);  //Left adjusted
  
  
  ADMUX |= 0x01;    //Use adc1 as input

//ADCSRA
  sbi(ADCSRA, ADEN);
  cbi(ADCSRA, ADSC);
  sbi(ADCSRA,ADATE);  //Enable auto triggering
  sbi(ADCSRA,ADIE);
  
  sbi(ADCSRA,ADPS2);
  sbi(ADCSRA,ADPS1);
  sbi(ADCSRA,ADPS0);  // prescale = 1/128
        

  
 //ADCSRB
  cbi(ADCSRB,ADTS2);
  cbi(ADCSRB,ADTS1);
  cbi(ADCSRB,ADTS0);    //free running mode
  
  
  bitWrite(ADCSRA, 6, 1); //
}

void comparatorSetup(){
  
  sbi(DIDR1, AIN1D);
  sbi(DIDR1, AIN0D);	//Disable digital input buffer
  
  cbi(ADCSRB, ACME);	//When this bit is written logic zero, 
  						  //AIN1 is applied to the negative input 
  						  //of the Analog Comparator
//ACSR
  cbi(ACSR, ACD);		//enable comparator
  sbi(ACSR,ACI);		//clear analog comparator interrupt
  sbi(ACSR, ACBG);		//AIN0 is applied to the negative input 
  						  //of the Analog Comparator
  						  //Here we bandgap voltage refernce instead of pwm that grino use because the mega 1280 has no pin connected to it...
  cbi(ACSR,ACIC);		//input capture disabled
  
  cbi(ACSR, ACIE);		// disable AC interrupt before ACIS1,0 settings
  sbi(ACSR,ACIS1);
  sbi(ACSR,ACIS0);		//Comparator Interrupt on Rising Output Edge.
  sbi(ACSR, ACIE);		// enable interrupt after ACIS1,0 settings completed


}


/* void pwmSetup(){
  pinMode(11, OUTPUT);

  
//Fast PWM and TOP=0xFF 
  cbi(TCCR2B, WGM22);
  sbi(TCCR2A, WGM21);
  sbi(TCCR2A, WGM20);
  
  sbi(TCCR2A, COM2A1);
  cbi(TCCR2A, COM2A0);
  cbi(TCCR2A, COM2B1);
  cbi(TCCR2A, COM2B0);
  
  cbi(TCCR2B,FOC2A);
  cbi(TCCR2B,FOC2B);
  
  sbi(TCCR2B,CS22);
  cbi(TCCR2B,CS21);
  cbi(TCCR2B,CS20);
  
  // OCR2A: pwm value input
} */

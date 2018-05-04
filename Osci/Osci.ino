#include "Osci.h"


volatile int16_t arrayCount;
volatile int32_t waitCount;
volatile unsigned long timerCount;
//--------- State
volatile int8_t waitState;
volatile int8_t timerState;    // ISR(ANALOG_COMP_vect): 1 -> OFF,  (waitCount == WAITCYCLES): 0 -> OFF
volatile int8_t writeToArray;
//--------- Value
volatile uint8_t adcReadVal;
volatile  uint8_t adcArray[ADCARRAYSIZE];
volatile unsigned long header_time;

void setup(){
  Serial.begin(9600);
  SREG = 0x80;
//  pinMode(22, OUTPUT);


  arrayCount = 0;
  waitCount = 0;
  writeToArray = ON;
  waitState = OFF;
  timerState = OFF;
  memset((void*) adcArray, 0, sizeof(adcArray));


  adcSetup();
  comparatorSetup();
  //pwmSetup();
}


void loop(){

  if(waitCount >= WAITCYCLES){
    freeze();
  }
  
}




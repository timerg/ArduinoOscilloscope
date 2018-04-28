#include "Isr.h"
#include "Osci.h"

ISR(ADC_vect)
{
  adcArray[arrayCount] = ADCH;
  arrayCount = (arrayCount + 1) % ADCARRAYSIZE;
  if(waitState == 1){
    waitCount++;
    if(waitCount == WAITCYCLES){
      cbi(ADCSRA, ADEN);
      freeze = 1;
    } 
  }
}

ISR(ANALOG_COMP_vect){
  cbi(ACSR, ACIE );
  waitState = 1;
}

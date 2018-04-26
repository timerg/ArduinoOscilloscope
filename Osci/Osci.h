#include <Arduino.h>

#ifndef _OSCI_
#define _OSCI_

  #include "Setup.h"
  #include "Isr.h"
  #include "mlib.h"

	#ifndef cbi
	#define cbi(sfr, bit) (_SFR_BYTE(sfr) &= ~_BV(bit))
	#endif
	
	#ifndef sbi
	#define sbi(sfr, bit) (_SFR_BYTE(sfr) |= _BV(bit))
	#endif
	
//-------- User parameter
  #define _DEBUG_
	#define ADCARRAYSIZE 1280
	#define WAITCYCLES 1280
 #define BUFFLIMIT 10   //25k
	
//-------- Variable
  //--------- Counter
	extern volatile int16_t arrayCount;
  extern volatile int32_t waitCount;
  //--------- State
  extern volatile int8_t waitState;    // -1: non-waiting, 1: wait cycle
  //--------- Value
	extern volatile uint8_t adcReadVal;
	extern volatile  uint8_t adcArray[ADCARRAYSIZE];


#endif

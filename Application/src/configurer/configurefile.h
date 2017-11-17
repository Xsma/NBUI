#ifndef CONFIGUREFILE_H
#define CONFIGUREFILE_H

#include "src/QJson/src/parser.h"

typedef struct {
    unsigned int id;
    unsigned char len;

} CAN_MODEL_ITEM;


class ConfigureFile
{
public:
    ConfigureFile();
};

#endif // CONFIGUREFILE_H

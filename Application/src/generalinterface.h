#ifndef GENERALINTERFACE_H
#define GENERALINTERFACE_H
#include <QCoreApplication>
#include <QDir>

class GeneralInterface
{
public:
    GeneralInterface();

public:
    static QString searchConfigFileByName(QString name);
};

#endif // GENERALINTERFACE_H

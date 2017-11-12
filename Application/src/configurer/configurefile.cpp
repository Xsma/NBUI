#include "configurefile.h"
#include <QVariantMap>

ConfigureFile::ConfigureFile()
{

    QString json = "{\
                   \"encoding\" : \"UTF-8\",\
                   \"plug-ins\" : [\
                   \"python\",\
                   \"c++\",\
                   \"ruby\"\
                   ],\
                \"indent\" : { \"length\" : 3, \"use_space\" : true }\
            \}";
    bool ok;

    QJson::Parser parser;
    QVariantMap result = parser.parse (json.toLatin1(), &ok).toMap();
    if (!ok) {
        qFatal("An error occurred during parsing");
        exit (1);
    }
}

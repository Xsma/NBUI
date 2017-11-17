#include "configurefile.h"
#include <QVariantMap>
#include <QDebug>
#include "src/generalinterface.h"

ConfigureFile::ConfigureFile()
{

    QString strProtocolConfigFileName;
    strProtocolConfigFileName = GeneralInterface::searchConfigFileByName("Config.json");
//    qDebug() << strProtocolConfigFileName;
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
        return;
    }

    qDebug() << "encoding:" << result["encoding"].toString();
    qDebug() << "plugins:";

    foreach (QVariant plugin, result["plug-ins"].toList()) {
        qDebug() << "\t-" << plugin.toString();
    }

    QVariantMap nestedMap = result["indent"].toMap();
    qDebug() << "length:" << nestedMap["length"].toInt();
    qDebug() << "use_space:" << nestedMap["use_space"].toBool();
}

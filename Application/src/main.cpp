/**
    @file
    @author Stefan Frings
*/

#include <QCoreApplication>
//#include <QApplication>
#include <QDir>
#include "httplistener.h"
#include "templatecache.h"
#include "httpsessionstore.h"
#include "staticfilecontroller.h"
#include "filelogger.h"
#include "requestmapper.h"
#include "configurer/configurefile.h"
#include "src/generalinterface.h"

//#include <QPushButton>
#include <QtWebKit>

using namespace stefanfrings;

/** Cache for template files */
TemplateCache *templateCache;

/** Storage for session cookies */
HttpSessionStore *sessionStore;

/** Controller for static files */
StaticFileController *staticFileController;

/** Redirects log messages to a file */
FileLogger *logger;



//#include <QDesktopServices>
/**
    Entry point of the program.
*/
int main(int argc, char *argv[])
{
     QCoreApplication app(argc,argv);
//    QApplication app(argc, argv);
    app.setApplicationName("Application");
    app.setOrganizationName("WXG");

    // Find the configuration file
    QString configFileName = GeneralInterface::searchConfigFileByName("Application.ini");

    // Configure logging into a file
    QSettings *logSettings = new QSettings(configFileName, QSettings::IniFormat, &app);
    logSettings->beginGroup("logging");
    FileLogger *logger = new FileLogger(logSettings, 10000, &app);
    logger->installMsgHandler();


    // Configure template loader and cache
    QSettings *templateSettings = new QSettings(configFileName, QSettings::IniFormat, &app);
    templateSettings->beginGroup("templates");
    templateCache = new TemplateCache(templateSettings, &app);

    // Configure session store
    QSettings *sessionSettings = new QSettings(configFileName, QSettings::IniFormat, &app);
    sessionSettings->beginGroup("sessions");
    sessionStore = new HttpSessionStore(sessionSettings, &app);

    // Configure static file controller
    QSettings *fileSettings = new QSettings(configFileName, QSettings::IniFormat, &app);
    fileSettings->beginGroup("docroot");
    staticFileController = new StaticFileController(fileSettings, &app);

    // Configure and start the TCP listener
    QSettings *listenerSettings = new QSettings(configFileName, QSettings::IniFormat, &app);
    listenerSettings->beginGroup("listener");
    new HttpListener(listenerSettings, new RequestMapper(&app), &app);

    qWarning("Application has started");

    ConfigureFile configFile;

    // Configure and start the chrome.
    QSettings *chromeSettings = new QSettings(configFileName, QSettings::IniFormat, &app);
    chromeSettings->beginGroup("chrome");

    QProcess *p = new QProcess();
    qWarning(chromeSettings->value("path").toString().toLatin1().data());
    p->start(chromeSettings->value("path").toString(), QStringList() << chromeSettings->value("arg").toString());

    app.exec();

    qWarning("Application has stopped");
}

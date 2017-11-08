# This project demonstrates how to use QtWebAppLib by including the
# sources into this project.

TARGET = Application
TEMPLATE = app
QT = core network webkit
CONFIG += console

HEADERS += \
           src/requestmapper.h \
           src/controller/dumpcontroller.h \
           src/controller/templatecontroller.h \
           src/controller/formcontroller.h \
           src/controller/fileuploadcontroller.h \
           src/controller/sessioncontroller.h \
    src/configurer/configurefile.h \
    src/QJson/src/FlexLexer.h \
    src/QJson/src/json_parser.hh \
    src/QJson/src/json_parser.yy \
    src/QJson/src/json_scanner.h \
    src/QJson/src/json_scanner.yy \
    src/QJson/src/location.hh \
    src/QJson/src/parser.h \
    src/QJson/src/parser_p.h \
    src/QJson/src/parserrunnable.h \
    src/QJson/src/position.hh \
    src/QJson/src/qjson_debug.h \
    src/QJson/src/qjson_export.h \
    src/QJson/src/qobjecthelper.h \
    src/QJson/src/serializer.h \
    src/QJson/src/serializerrunnable.h \
    src/QJson/src/stack.hh

SOURCES += src/main.cpp \
           src/requestmapper.cpp \
           src/controller/dumpcontroller.cpp \
           src/controller/templatecontroller.cpp \
           src/controller/formcontroller.cpp \
           src/controller/fileuploadcontroller.cpp \
           src/controller/sessioncontroller.cpp \
    src/configurer/configurefile.cpp \
    src/QJson/src/json_parser.cc \
    src/QJson/src/json_scanner.cc \
    src/QJson/src/json_scanner.cpp \
    src/QJson/src/parser.cpp \
    src/QJson/src/parserrunnable.cpp \
    src/QJson/src/qobjecthelper.cpp \
    src/QJson/src/serializer.cpp \
    src/QJson/src/serializerrunnable.cpp

OTHER_FILES += etc/* etc/docroot/* etc/templates/* etc/ssl/* logs/* ../readme.txt

#---------------------------------------------------------------------------------------
# The following lines include the sources of the QtWebAppLib library
#---------------------------------------------------------------------------------------

include(../QtWebApp/logging/logging.pri)
include(../QtWebApp/httpserver/httpserver.pri)
include(../QtWebApp/templateengine/templateengine.pri)
# Not used: include(../QtWebApp/qtservice/qtservice.pri)

DISTFILES += \
    src/QJson/src/.gitignore \
    src/QJson/src/CMakeLists.txt

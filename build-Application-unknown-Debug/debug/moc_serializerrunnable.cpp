/****************************************************************************
** Meta object code from reading C++ file 'serializerrunnable.h'
**
** Created by: The Qt Meta Object Compiler version 63 (Qt 4.8.6)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../Application/src/QJson/src/serializerrunnable.h"
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'serializerrunnable.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 63
#error "This file was generated using the moc from 4.8.6. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
static const uint qt_meta_data_QJson__SerializerRunnable[] = {

 // content:
       6,       // revision
       0,       // classname
       0,    0, // classinfo
       1,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       1,       // signalCount

 // signals: signature, parameters, type, tag, flags
      51,   27,   26,   26, 0x05,

       0        // eod
};

static const char qt_meta_stringdata_QJson__SerializerRunnable[] = {
    "QJson::SerializerRunnable\0\0"
    "serialized,ok,error_msg\0"
    "parsingFinished(QByteArray,bool,QString)\0"
};

void QJson::SerializerRunnable::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        Q_ASSERT(staticMetaObject.cast(_o));
        SerializerRunnable *_t = static_cast<SerializerRunnable *>(_o);
        switch (_id) {
        case 0: _t->parsingFinished((*reinterpret_cast< const QByteArray(*)>(_a[1])),(*reinterpret_cast< bool(*)>(_a[2])),(*reinterpret_cast< const QString(*)>(_a[3]))); break;
        default: ;
        }
    }
}

const QMetaObjectExtraData QJson::SerializerRunnable::staticMetaObjectExtraData = {
    0,  qt_static_metacall 
};

const QMetaObject QJson::SerializerRunnable::staticMetaObject = {
    { &QObject::staticMetaObject, qt_meta_stringdata_QJson__SerializerRunnable,
      qt_meta_data_QJson__SerializerRunnable, &staticMetaObjectExtraData }
};

#ifdef Q_NO_DATA_RELOCATION
const QMetaObject &QJson::SerializerRunnable::getStaticMetaObject() { return staticMetaObject; }
#endif //Q_NO_DATA_RELOCATION

const QMetaObject *QJson::SerializerRunnable::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->metaObject : &staticMetaObject;
}

void *QJson::SerializerRunnable::qt_metacast(const char *_clname)
{
    if (!_clname) return 0;
    if (!strcmp(_clname, qt_meta_stringdata_QJson__SerializerRunnable))
        return static_cast<void*>(const_cast< SerializerRunnable*>(this));
    if (!strcmp(_clname, "QRunnable"))
        return static_cast< QRunnable*>(const_cast< SerializerRunnable*>(this));
    return QObject::qt_metacast(_clname);
}

int QJson::SerializerRunnable::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 1)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 1;
    }
    return _id;
}

// SIGNAL 0
void QJson::SerializerRunnable::parsingFinished(const QByteArray & _t1, bool _t2, const QString & _t3)
{
    void *_a[] = { 0, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)), const_cast<void*>(reinterpret_cast<const void*>(&_t3)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}
QT_END_MOC_NAMESPACE

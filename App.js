import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';

const App = () => {
    
    const [mostrarForm, setMostrarForm] = useState(false)
    // definir state de citas
    const [citas, setCitas] = useState([])

  // Elimina los pacientes de las citas
  const eliminarCita = id => {
      const nuevasCitas = citas.filter(cita => cita.id !== id)
      setCitas(nuevasCitas)
  }

  // muestra el formulario 
  const mostrarFormulario = () => {
      setMostrarForm(!mostrarForm)
  }

  // Ocultar el teclado
  const cerrarTeclado = () => {
      Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={()=> cerrarTeclado()}>
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Administrador de Citas</Text>

            <View>
                <TouchableHighlight onPress={e => mostrarFormulario() } style={styles.btnMostrarForm}>
                    <Text style={styles.textoMostrarForm}>{mostrarForm ? 'Cancelar nueva cita' : 'Crear nueva cita'}</Text>
                </TouchableHighlight>
            </View>

        <View style={styles.contenido}>
            {mostrarForm ? (
                <>
                    <Text style={styles.titulo}>Crear nueva cita</Text>
                    <Formulario citas={citas} setCitas={setCitas} setMostrarForm={setMostrarForm} />
                </>
            ) : (
                <>
                    <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus citas' : "No hay citas, agrega una"}</Text>
                    <FlatList
                        style={styles.listado}
                        data={citas} 
                        renderItem={ ({item}) => <Cita cita={item} eliminarCita={eliminarCita} /> } 
                        keyExtractor={cita => cita.id}
                    />
                </>
            )}
            
        </View>

        </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: "#AA076B",
        flex: 1
    },
    titulo: {
        color: "#FFF",
        textAlign: "center",
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        marginBottom: 20,
        fontSize: 24,
        fontWeight: "bold"
    },
    contenido: {
        flex: 1,
        marginHorizontal: '2.5%'
    },
    listado: {
        flex: 1
    },
    btnMostrarForm: {
        padding: 10,
        backgroundColor: "#7d024e",
        marginVertical: 10
    },
    textoMostrarForm: {
        color: "#FFF",
        fontWeight: "bold",
        textAlign: "center"
    }
})


export default App;

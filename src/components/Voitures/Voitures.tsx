import React, { useEffect, useState } from 'react'
import './Voitures.scss'
import { Table, Modal, Button, Form, Message, Toggle, Checkbox } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const fetchVoitures = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'token': 'fcacbd6ab1d8b11bdba1559dec6fce16'
    }
  }
  return await (await fetch('http://localhost:80/api/v1/cars', options)).json()
}

const PatchVoitures = async (formValue: any) => {
  const { _id, brand, model, mileage, available } = formValue
  const data = {
    _id,
    brand,
    mileage,
    model,
    available
  }
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'token': 'fcacbd6ab1d8b11bdba1559dec6fce16'
    },
    body: JSON.stringify(data)
  }
  return await (await fetch(`http://localhost:80/api/v1/cars/${_id}`, options)).json()
}

const Voitures = () => {

  const [cars, setCars] = useState()

  const [modalInfo, setModalInfo] = useState("")
  const handleOpen = (rowData: any) => setModalInfo(rowData)
  const handleClose = () => {
    setModalInfo("")
    setPatchSuccess(false)
  }
  const [formValue, setFormValue] = React.useState({
    //@ts-ignore
    _id: modalInfo ? modalInfo._id : '',
    //@ts-ignore
    brand: modalInfo ? modalInfo.brand : '',
    //@ts-ignore
    model: modalInfo ? modalInfo.model : '',
    //@ts-ignore
    mileage: modalInfo ? modalInfo.mileage : '',
    //@ts-ignore
    available: modalInfo ? modalInfo.available : false,
  })
  const [patchSuccess, setPatchSuccess] = useState(false)
  const handlePatch = async () => {
    PatchVoitures(formValue).then(res => {
      setPatchSuccess(true)
    })
  }

  useEffect(() => {
    setFormValue({
      //@ts-ignore
      _id: modalInfo ? modalInfo._id : '',
      //@ts-ignore
      brand: modalInfo ? modalInfo.brand : '',
      //@ts-ignore
      model: modalInfo ? modalInfo.model : '',
      //@ts-ignore
      mileage: modalInfo ? modalInfo.mileage : '',
      //@ts-ignore
      available: modalInfo ? modalInfo.available : false
    })
  }, [modalInfo])

  useEffect(() => {
    fetchVoitures().then(res => {
      const data = res.map((car: any) => {
        car.rentsCount = car.rents.length
        car.disponibility = car.available ? 'Oui' : 'Non'
        return car
      })
      setCars(data)
    })
  }, [patchSuccess])

  return (
    <div className='Parc'>
      <Table
        autoHeight
        data={cars}
        width={1600}
      >
        <Column flexGrow={1} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="_id" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Marque</HeaderCell>
          <Cell dataKey="brand" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Modèle</HeaderCell>
          <Cell dataKey="model" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>km</HeaderCell>
          <Cell dataKey="mileage" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Date d'acquisition</HeaderCell>
          <Cell dataKey="acquisition_date" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Disponible</HeaderCell>
          <Cell dataKey="disponibility" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>rents</HeaderCell>
          <Cell dataKey="rentsCount" />
        </Column>

        <Column flexGrow={1} fixed="right">
          <HeaderCell>...</HeaderCell>

          <Cell>
            {rowData => (
              <>
                <Button onClick={() => handleOpen(rowData)}>Modifier</Button>
                <Modal
                  //@ts-ignore
                  open={rowData._id === modalInfo._id} backdrop='static' onClose={handleClose} size="xs">
                  <Modal.Header>
                    <Modal.Title>Informations</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form fluid onChange={setFormValue} formValue={formValue}>
                      <Form.Group controlId="brand-9">
                        <Form.ControlLabel>Marque</Form.ControlLabel>
                        <Form.Control name="brand" />
                        <Form.HelpText>Requis</Form.HelpText>
                      </Form.Group>
                      <Form.Group controlId="model-9">
                        <Form.ControlLabel>Modèle</Form.ControlLabel>
                        <Form.Control name="model" />
                        <Form.HelpText>Requis</Form.HelpText>
                      </Form.Group>
                      <Form.Group controlId="mileage-9">
                        <Form.ControlLabel>km</Form.ControlLabel>
                        <Form.Control name="mileage" />
                        <Form.HelpText>Requis</Form.HelpText>
                      </Form.Group>
                      <Form.Group controlId="available-9">
                        <Form.ControlLabel>Disponible</Form.ControlLabel>
                        <Toggle defaultChecked={formValue.available} />
                      </Form.Group>
                      {
                        patchSuccess && <Message showIcon type="success" header="Success">
                          Les informations du parc ont été modifiées avec succès.
                        </Message>
                      }
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    {
                      patchSuccess ?

                        <>
                          <Button onClick={handleClose} appearance="primary">
                            Fermer
                          </Button>
                        </>

                        :

                        <>
                          <Button onClick={handlePatch} appearance="primary">
                            Valider
                          </Button>
                          <Button onClick={handleClose} appearance="subtle">
                            Annuler
                          </Button>
                        </>

                    }
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </Cell>
        </Column>
      </Table>
    </div>
  )
}

export default Voitures
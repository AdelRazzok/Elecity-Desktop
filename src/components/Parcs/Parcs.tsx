import React, { useEffect, useState } from 'react'
import './Parcs.scss'
import { Table, Modal, Button, Form, SelectPicker, Message } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const fetchParcs = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'token': 'fcacbd6ab1d8b11bdba1559dec6fce16'
    }
  }
  return await (await fetch('http://localhost:80/api/v1/platforms', options)).json()
}

const PatchParcs = async (formValue: any) => {
  const { _id, street, city, zipcode } = formValue
  const data = {
    _id,
    address: {
      street,
      zipcode,
      city
    }
  }
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'token': 'fcacbd6ab1d8b11bdba1559dec6fce16'
    },
    body: JSON.stringify(data)
  }
  return await (await fetch(`http://localhost:80/api/v1/platforms/${_id}`, options)).json()
}

const styles = {
  radioGroupLabel: {
    padding: '8px 12px',
    display: 'inline-block',
    verticalAlign: 'middle'
  }
}

const cityData = ['Le Havre', 'Rouen', 'Caen'].map(item => ({
  label: item,
  value: item
}))


const Parcs = () => {

  const [platforms, setPlatforms] = useState()

  useEffect(() => {
    fetchParcs().then(res => {
      const data = res.map((parc: any) => {
        parc.carsCount = parc.cars.length
        return parc
      })
      setPlatforms(data)
    })
  }, [])

  // const [open, setOpen] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState('static')
  const [modalInfo, setModalInfo] = useState("")
  const handleOpen = (rowData: any) => setModalInfo(rowData)
  const handleClose = () => setModalInfo("")
  const [formValue, setFormValue] = React.useState({
    //@ts-ignore
    _id: modalInfo ? modalInfo._id : '',
    //@ts-ignore
    city: modalInfo ? modalInfo.address.city : '',
    //@ts-ignore
    street: modalInfo ? modalInfo.address.street : '',
    //@ts-ignore
    zipcode: modalInfo ? modalInfo.address.zipcode : '',
    //@ts-ignore
    phone: modalInfo ? modalInfo.phone : '',
  })
  const [patchSuccess, setPatchSuccess] = useState(false)
  const handlePatch = async () => {
    PatchParcs(formValue).then(res => {
      setPatchSuccess(true)
      // const { _id, phone } = res
      // const { street, city, zipcode } = res.address
      // setFormValue({
      //   _id,
      //   city,
      //   street,
      //   zipcode,
      //   phone
      // })
    })
  }

  useEffect(() => {
    setFormValue({
      //@ts-ignore
      _id: modalInfo ? modalInfo._id : '',
      //@ts-ignore
      city: modalInfo ? modalInfo.address.city : '',
      //@ts-ignore
      street: modalInfo ? modalInfo.address.street : '',
      //@ts-ignore
      zipcode: modalInfo ? modalInfo.address.zipcode : '',
      //@ts-ignore
      phone: modalInfo ? modalInfo.phone : ''
    })
  }, [modalInfo])


  return (
    <Table
      autoHeight
      data={platforms}
    >
      <Column flexGrow={1} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="_id" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Ville</HeaderCell>
        <Cell dataKey="address.city" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Code Postal</HeaderCell>
        <Cell dataKey="address.zipcode" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Adresse</HeaderCell>
        <Cell dataKey="address.street" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Téléphone</HeaderCell>
        <Cell dataKey="phone" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>cars</HeaderCell>
        <Cell dataKey="carsCount" />
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
                    <Form.Group controlId="street-9">
                      <Form.ControlLabel>Adresse</Form.ControlLabel>
                      <Form.Control name="street" />
                      <Form.HelpText>Requis</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="phone-9">
                      <Form.ControlLabel>Téléphone</Form.ControlLabel>
                      <Form.Control name="phone" />
                    </Form.Group>
                    <Form.Group controlId="select-10">
                      <Form.ControlLabel>Ville</Form.ControlLabel>
                      <Form.Control defaultValue={formValue.city} name="select" data={cityData} accepter={SelectPicker} />
                    </Form.Group>
                    {
                      patchSuccess && <Message showIcon type="success" header="Success">
                        Les informations du parc ont été modifiées avec succès.
                      </Message>
                    }
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handlePatch} appearance="primary">
                    Valider
                  </Button>
                  <Button onClick={handleClose} appearance="subtle">
                    Annuler
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </Cell>
      </Column>
    </Table>
  )
}

export default Parcs
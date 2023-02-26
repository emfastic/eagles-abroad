import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, InputGroup, InputLeftElement, Input, createIcon, Icon, Divider, ModalFooter, Button, Flex, useToast, Avatar, IconButton, useDisclosure } from '@chakra-ui/react'
import { FaRegUser } from 'react-icons/fa'
import { supabase } from 'lib/supabaseClient'
import React, { useRef } from 'react'
import SnapIcon from './SnapIcon'
import InstaIcon from './InstaIcon'
import TwitterIcon from './TwitterIcon'

export default function ProfileModal({profile}: any) {

  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclosure();

  const instagram = useRef<any>(null)
  const twitter = useRef<any>(null)
  const snapchat = useRef<any>(null)

  const toast = useToast()

  async function handleSave(instagram: string | null, snapchat: string | null, twitter: string | null) {
    if (instagram === null && snapchat === null && twitter === null) {
      onClose()
      return
    }

    instagram ? instagram : instagram = null
    snapchat ? snapchat : snapchat = null
    twitter ? twitter : twitter = null
    
    const { data, error } = await supabase
      .from('profiles')
      .update({ instagram: instagram, snapchat: snapchat, twitter: twitter })
      .eq('id', profile.id)

    onClose()

    if (error) {
      toast({
        title: "Error updating profile, try again!",
        status: "error",
        duration: 3000
      })
    } else {
      toast({
        title: "Profile updated!",
        status: "success",
        duration: 3000
      })
    }
  }

  return (
    <>
    <IconButton aria-label='profile' onClick={onOpen} icon={<FaRegUser />} bg="maroon" _hover={{ backgroundColor: "#610018" }} color="gold" size="lg"/>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='2xl'>Jake Ottiger</ModalHeader>
          <ModalCloseButton onClick={onClose}/>
          <ModalBody>
            <InputGroup>
              <InputLeftElement><InstaIcon boxSize={6}/></InputLeftElement>
              <Input placeholder="jakeottiger" ref={instagram} />
            </InputGroup>
            <InputGroup mt={4}>
              <InputLeftElement><SnapIcon boxSize={6} /></InputLeftElement>
              <Input placeholder="username" ref={snapchat} />
            </InputGroup>
            <InputGroup mt={4}>
              <InputLeftElement><TwitterIcon boxSize={6} /></InputLeftElement>
              <Input placeholder="jakeottiger" ref={twitter} />
            </InputGroup>
          </ModalBody>
          <ModalFooter justifyContent='right'>
            <Button bgColor={"maroon"}
            _hover={{ backgroundColor: "#610018" }}
            color="gold" onClick={() => {handleSave(instagram.current.value, snapchat.current.value, twitter.current.value)}}> Save </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
      </>
  )
}

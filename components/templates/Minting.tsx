import { Box, Button, Flex, Text, VStack, NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,} from '@chakra-ui/react'
import { useContext } from 'react'
import { useState } from 'react'
import { NftContractContext } from '../../contexts/NftContractProvider'
import { useConnectWallet } from '../../hooks/useConnectWallet'
import { useMint } from '../../hooks/useMint'
import { Fade } from '../elements/Fade'
import { NftImagesSlideShow } from '../elements/NftImagesSlideShow'

import { useAddress } from '@thirdweb-dev/react'

const Component: React.FC = () => {
  const store = useContext(NftContractContext)
  const address = useAddress()
 
  const [mintcount, setMintcount] = useState('');
  const { mint } = useMint(Number(mintcount))
  const { connectWallet } = useConnectWallet()

  return (
    <Flex
      maxW={'8xl'}
      justifyContent="center"
      h="100%"
      alignItems="center"
      mx="auto"
    >
      <Fade>
        <VStack spacing={6}>
          <Box width="240px" height="240px">
            <NftImagesSlideShow />
          </Box>

          <div>
            {address ? (
              <Button onClick={mint} disabled={store.isClaiming}>
                {store.isClaiming
                  ? 'claiming...'
                  : `MINT (${store.claimPrice} ETH)`}
              </Button>
            ) : (
              <Button onClick={connectWallet}>
                <Text fontSize="xs">Connect Wallet</Text>
              </Button>
            )}
            <NumberInput defaultValue={1} min={1} max={10} onChange={(event) => setMintcount(event)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text pt={2} fontSize="xs" textAlign={'center'}>
              {store.claimedSupply} / {store.totalSupply}
            </Text>
            <Text pt={2} fontSize="xs" textAlign={'center'}>
              goerli testnet
            </Text>
          </div>
        </VStack>
      </Fade>
    </Flex>
  )
}

export { Component as Minting }

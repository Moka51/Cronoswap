import React, { useEffect } from 'react'
import base64url from 'base64url'
import useParsedQueryString from 'hooks/useParsedQueryString'
import Web3 from 'web3'

const ReferralComponent = () => {
  const query = useParsedQueryString()
  useEffect(() => {
    if (query.ref) {
      const ref = base64url.decode(query.ref as string)
      const web3 = new Web3()
      // set referral code if its valid address
      if (web3.utils.isAddress(ref)) {
        localStorage.setItem('referral', ref)
      }
      // TODO: should we add a toast here?
    }
  }, [query.ref])
  return <></>
}

export default ReferralComponent

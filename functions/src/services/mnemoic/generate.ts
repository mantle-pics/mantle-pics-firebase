import * as crypto from "crypto";
import * as bip39 from "bip39";

// Define a function to convert an address to a mnemonic phrase
export const addressToMnemonic = (address: string) => {
  // First convert the address to a binary seed with another key
  const seed = crypto
      .createHmac("sha512", "Ethereum seed for mnemonic")
      .update(Buffer.from(address, "hex"))
      .digest();
    // Then use the first 32 bytes of the seed as entropy
  const entropy = seed.slice(0, 32);
  // Finally, generate the mnemonic phrase
  const mnemonicPhrase = bip39.entropyToMnemonic(entropy);
  return mnemonicPhrase;
};

// Define a function to convert an address to a number
export const addressToNumber = (address: string) => {
  // First convert the address to a binary seed with another key
  const seed = crypto
      .createHmac("sha512", "Ethereum seed for number")
      .update(Buffer.from(address, "hex"))
      .digest();
    // Then generate a 12-digit decimal number from the seed
  const decimal = seed.slice(0, 12).readBigUInt64BE();
  return decimal % 10n ** 12n;
};

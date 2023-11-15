"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const hdwallet_provider_1 = __importDefault(require("@truffle/hdwallet-provider"));
require("dotenv/config");
const abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "add_request",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "creditScore",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "lastUpdatedTimestamp",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "lastUpdatedBlock",
                        type: "uint256",
                    },
                ],
                internalType: "struct WhaleScore.OracleData",
                name: "data",
                type: "tuple",
            },
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "apply_request",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
        ],
        name: "get_last_updated_block",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
        ],
        name: "get_last_updated_timestamp",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "get_oracle",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "get_queue",
        outputs: [
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
        ],
        name: "get_score",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
        ],
        name: "get_user_data",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "creditScore",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "lastUpdatedTimestamp",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "lastUpdatedBlock",
                        type: "uint256",
                    },
                ],
                internalType: "struct WhaleScore.OracleData",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const numberOfAddresses = 3;
        let provider = new hdwallet_provider_1.default({
            mnemonic: process.env.MNEMONIC,
            numberOfAddresses,
            providerOrUrl: "https://testnet.bitfinity.network",
        });
        const web3 = new web3_1.default(provider);
        let contract = new web3.eth.Contract(abi, "0x0A48e60B53633D489D3027d191E53d7e48Ce145B");
        contract.handleRevert = true;
        while (true) {
            try {
                const queue = yield contract.methods.get_queue().call();
                console.log("queue", queue);
                if (queue.length > 0) {
                    const user = queue[0];
                    const score = Math.floor(Math.random() * 1000);
                    let res = yield contract.methods
                        .apply_request({
                        creditScore: score,
                        lastUpdatedTimestamp: Math.floor(Date.now() / 1000),
                        lastUpdatedBlock: yield web3.eth.getBlockNumber(),
                    }, user, 1)
                        .send({
                        from: "0xBe74213F721899bdB2a8e58bb83e95d48249630d",
                        gas: 1000000,
                    });
                    console.log(res);
                }
            }
            catch (e) {
                console.error(e);
            }
            yield new Promise((r) => setTimeout(r, 500));
        }
    });
}
main();
//# sourceMappingURL=index.js.map
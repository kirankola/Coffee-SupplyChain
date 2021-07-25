App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();
        App.ActorID = $("#ActorID").val();


        console.log(
            App.sku,
            App.upc,
            App.ownerID,
            App.originFarmerID,
            App.originFarmName,
            App.originFarmInformation,
            App.originFarmLatitude,
            App.originFarmLongitude,
            App.productNotes,
            App.productPrice,
            App.distributorID,
            App.retailerID,
            App.consumerID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function (err, res) {
            if (err) {
                console.log('Error:', err);
                return;
            }
            console.log('getMetaskID:', res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain = '../../build/contracts/SupplyChain.json';

        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function (data) {
            console.log('data', data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);

            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function (event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId', processId);

        switch (processId) {
            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.processItem(event);
                break;
            case 3:
                return await App.packItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.buyItem(event);
                break;
            case 6:
                return await App.shipItem(event);
                break;
            case 7:
                return await App.receiveItem(event);
                break;
            case 8:
                return await App.purchaseItem(event);
                break;
            case 9:
                return await App.fetchItemBufferOne(event);
                break;
            case 10:
                return await App.fetchItemBufferTwo(event);
                break;
            case 20:
                return await App.addFarmer(event);
                break;
            case 21:
                return await App.addDistributor(event);
                break;

            case 22:
                return await App.addRetailer(event);
                break;
            case 23:
                return await App.addConsumer(event);
                break;
        }
    },

    addFarmer: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();
        alert(App.ActorID);

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.addFarmer(App.ActorID, { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-events").append('<li> addFarmer Tx: '+result.tx+'</li>');
            console.log('Add Farmer', result);
        }).catch(function (err) {
            console.log(err.message);
        });


    },
    addDistributor: function (event) {
        alert("here");





        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();
        alert(App.ActorID);

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.addDistributor(App.ActorID, { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-events").append('<li> addDistributor Tx: '+result.tx+'</li>');
            console.log('Add Distributor', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },
    addRetailer: function (event) {

        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();
        alert(App.ActorID);

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.addRetailer(App.ActorID, { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-events").text("kiran");
            console.log('Add Retail', result);
        }).catch(function (err) {
            console.log(err.message);
        });

    },
    addConsumer: function (event) {

        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();
        alert(App.ActorID);

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.addConsumer(App.ActorID, { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-events").append('<li> addConsumer Tx: '+result.tx+'</li>');
            console.log('Add Consumer', result);
        }).catch(function (err) {
            console.log(err.message);
        });

    },

    harvestItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();
        //console.log("upc ",App.upc);

        App.contracts.SupplyChain.deployed().then(function (instance) {
            alert(App.metamaskAccountID);
            return instance.harvestItem(
                App.upc,
                App.metamaskAccountID,
                App.originFarmName,
                App.originFarmInformation,
                App.originFarmLatitude,
                App.originFarmLongitude,
                App.productNotes, { from: App.metamaskAccountID }
            );
        }).then(function (result) {
            $("#ftc-events").append('<li> HarvestItem Tx: '+result.tx+'</li>');
            console.log('harvestItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    processItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.processItem(App.upc, { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-events").append('<li> ProcessItem Tx: '+result.tx+'</li>');
            console.log('processItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    packItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.packItem(App.upc, { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-events").append('<li> PackIt Tx: '+result.tx+'</li>');
            console.log('packItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    sellItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function (instance) {
            // const productPrice = web3.toWei(1, "ether");
            console.log('productPrice', App.productPrice);
            console.log('App.upc', App.upc);
            return instance.sellItem(App.upc, web3.toWei(App.productPrice, "ether"), { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-events").append('<li> SellItem Tx: '+result.tx+'</li>');
            console.log('sellItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    buyItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();
        App.contracts.SupplyChain.deployed().then(function (instance) {
            const walletValue = web3.toWei(3, "ether");
            console.log(App.metamaskAccountID);
            return instance.buyItem(App.upc, { from: App.metamaskAccountID, value: web3.toWei(App.productPrice, "ether") });
        }).then(function (result) {
            $("#ftc-events").append('<li> buyItem Tx: '+result.tx+'</li>');
            console.log('buyItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();
        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.shipItem(App.upc, { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-events").append('<li> shipItem Tx: '+result.tx+'</li>');
            console.log('shipItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    receiveItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.receiveItem(App.upc, { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-events").append('<li> receiveItem Tx: '+result.tx+'</li>');
            console.log('receiveItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    purchaseItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.purchaseItem(App.upc, { from: App.metamaskAccountID });
        }).then(function (result) {
            $("#ftc-events").append('<li> purchaseItem Tx: '+result.tx+'</li>');
            console.log('purchaseItem', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc', App.upc);

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.fetchItemBufferOne("1");
        }).then(function (result) {
            $("#ftc-events").append('<li> BufferOne Tx: '+result.tx+'</li>');

            $("#sku").val(result[0]);
            $("#ownerID").val(result[2]);
            $("#originFarmerID").val(result[3]);
            $("#originFarmName").val(result[4]);
            $("#originFarmInformation").val(result[5]);
            $("#originFarmLatitude").val(result[6]);
            $("#originFarmLongitude").val(result[7]);


            console.log('fetchItemBufferOne', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {

        App.upc = $('#upc').val();

        App.contracts.SupplyChain.deployed().then(function (instance) {
            return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function (result) {

            $("#productNotes").val(result[3]);
            $("#productPrice").val(result[4]);
            $("#distributorID").val(result[6]);
            $("#retailerID").val(result[7]);
            $("#consumerID").val(result[8]);


            console.log('fetchItemBufferTwo', result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                    App.contracts.SupplyChain.currentProvider,
                    arguments
                );
            };
        }

        App.contracts.SupplyChain.deployed().then(function (instance) {
            var events = instance.allEvents(function (err, log) {
                if (!err)
                    $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
            });
        }).catch(function (err) {
            console.log(err.message);
        });

    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});

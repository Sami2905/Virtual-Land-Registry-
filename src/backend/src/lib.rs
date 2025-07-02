use candid::{CandidType, Principal};
use ic_cdk::api;
use ic_cdk_macros::*;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct Coordinates {
    pub x: u32,
    pub y: u32,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct LandNFT {
    pub id: u64,
    pub name: String,
    pub coordinates: Coordinates,
    pub size: String,
    pub image_data: Vec<u8>,
    pub owner: Principal,
    pub timestamp: u64,
}

// NFT storage in memory
thread_local! {
    static LAND_STORAGE: RefCell<Vec<LandNFT>> = RefCell::new(Vec::new());
    static NEXT_ID: RefCell<u64> = RefCell::new(1); // Start IDs from 1
}

// Update function to mint land
#[update]
fn mint_land(
    name: String,
    coordinates: Coordinates,
    size: String,
    image_data: Vec<u8>,
) -> u64 {
    let caller = api::caller();
    let timestamp = api::time();
    
    // Get the next ID and increment it
    let id = NEXT_ID.with(|next_id| {
        let mut id_ref = next_id.borrow_mut();
        let current_id = *id_ref;
        *id_ref += 1; // Increment for next time
        current_id
    });

    let land = LandNFT {
        id,
        name,
        coordinates,
        size,
        image_data,
        owner: caller,
        timestamp,
    };

    LAND_STORAGE.with(|storage| {
        storage.borrow_mut().push(land);
    });

    id
}

#[query]
fn get_all_land() -> Vec<LandNFT> {
    LAND_STORAGE.with(|storage| storage.borrow().clone())
}

#[query]
fn get_my_land() -> Vec<LandNFT> {
    let caller = api::caller();
    LAND_STORAGE.with(|storage| {
        storage
            .borrow()
            .iter()
            .filter(|land| land.owner == caller)
            .cloned()
            .collect()
    })
}


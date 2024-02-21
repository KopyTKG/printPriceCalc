use std::fs::{self, File};
use std::io::{self, Write};
use tauri::api::path;
use std::path::Path;

const FOLDER_NAME: &str = "PrintCalc";


fn main() {
    let _ = setup();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![write_filament])
        .invoke_handler(tauri::generate_handler![edit_filament])
        .invoke_handler(tauri::generate_handler![remove_filament])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}



fn setup() -> io::Result<()> {
    let path_dir = path::config_dir().expect("Incorrect path");
    let path = format!("{}/{}", path_dir.display(), FOLDER_NAME);

    let filaments_path = format!("{}/filaments.json", path);
    let example_path = format!("{}/filaments.example.json", path);
    let vars_path = format!("{}/vars.json", path);


    let path = Path::new(&path);

    if path.exists() && path.is_dir() {
        println!("The directory already exists.");
    } else {
        if let Err(e) = fs::create_dir_all(&path) {
            eprintln!("Failed to create directory: {}", e);
            return Err(e);
        }
        let mut filament_file = File::create(&filaments_path)?;
        filament_file.write_all(b"[]")?;

        let mut example_file = File::create(&example_path)?;
        example_file.write_all(b"[{\"vendor\": \"\",\"color\": \"\",\"type\": \"\",\"price\": 0,\"weight\": 0}]")?;

        let mut vars_file = File::create(&vars_path)?;
        vars_file.write_all(b"{\"Energy\": 0,\"Margin\": 0.00,\"PricePerHour\": 0,\"PostProcessing\": 0.00}")?;
    }

    Ok(())
}

#[tauri::command]
fn write_filament(vendor: &str, color: &str, type_: &str, price: i32, weight: i32) -> Result<String, String> {
    let path_dir = path::config_dir().expect("Incorrect path");
    let path = format!("{}/{}", path_dir.display(), FOLDER_NAME);

    let file_path = format!("{}/filaments.json", path);
    
    let mut file_content = match std::fs::read_to_string(file_path.clone()) {
        Ok(content) => content,
        Err(e) => return Err(format!("Failed to read file: {}", e)),
    };

    let mut array: Vec<serde_json::Value> = match serde_json::from_str(&file_content) {
        Ok(array) => array,
        Err(_) => vec![], 
    };

    let new_entry = serde_json::json!({
        "vendor": vendor,
        "color": color,
        "type": type_,
        "price": price,
        "weight": weight,
    });

    array.push(new_entry);
    file_content = match serde_json::to_string(&array) {
        Ok(json_string) => json_string,
        Err(e) => return Err(format!("Failed to serialize JSON: {}", e)),
    };
    match std::fs::write(file_path.clone(), file_content) {
        Ok(_) => Ok(format!("Successfully updated {}", file_path.clone())),
        Err(e) => Err(format!("Failed to write to file: {}", e)),
    }
}


#[tauri::command]
fn edit_filament(id: usize, vendor: &str, color: &str, type_: &str, price: i32, weight: i32) -> Result<String, String> {
    let path_dir = path::config_dir().expect("Incorrect path");
    let path = format!("{}/{}", path_dir.display(), FOLDER_NAME);

    let file_path = format!("{}/filaments.json", path);
    let mut file_content = match std::fs::read_to_string(file_path.clone()) {
        Ok(content) => content,
        Err(e) => return Err(format!("Failed to read file: {}", e)),
    };

    let mut array: Vec<serde_json::Value> = match serde_json::from_str(&file_content) {
        Ok(array) => array,
        Err(_) => vec![],

    };
    array[id] = serde_json::json!({
        "vendor": vendor,
        "color": color,
        "type": type_,
        "price": price,
        "weight": weight,
    });

    file_content = match serde_json::to_string(&array) {
        Ok(json_string) => json_string,
        Err(e) => return Err(format!("Failed to serialize JSON: {}", e)),
    };

    match std::fs::write(file_path.clone(), file_content) {
        Ok(_) => Ok(format!("Successfully updated {}", file_path.clone())),
        Err(e) => Err(format!("Failed to write to file: {}", e)),
    }
}


#[tauri::command]
fn remove_filament(id: usize) -> Result<String, String> {
    let path_dir = path::config_dir().expect("Incorrect path");
    let path = format!("{}/{}", path_dir.display(), FOLDER_NAME);

    let file_path = format!("{}/filaments.json", path);
    let mut file_content = match std::fs::read_to_string(file_path.clone()) {
        Ok(content) => content,
        Err(e) => return Err(format!("Failed to read file: {}", e)),
    };

    let mut array: Vec<serde_json::Value> = match serde_json::from_str(&file_content) {
        Ok(array) => array,
        Err(_) => vec![],
    };
    array.remove(id);

    file_content = match serde_json::to_string(&array) {
        Ok(json_string) => json_string,
        Err(e) => return Err(format!("Failed to serialize JSON: {}", e)),
    };
    match std::fs::write(file_path.clone(), file_content) {
        Ok(_) => Ok(format!("Successfully updated {}", file_path.clone())),
        Err(e) => Err(format!("Failed to write to file: {}", e)),
    }
}


#[tauri::command]
fn edit_filament(id: usize, vendor: &str, color: &str, type_: &str, price: i32, weight: i32) -> Result<String, String> {
    // Specify the file path where you want to save the filament data
    let home_dir = std::env::var("HOME").expect("HOME environment variable not set");
    let config_dir = format!("{}/.config/3DprintCalc", home_dir);

    let file_path = format!("{}/filaments.json", config_dir);

    // Read the current contents of the file
    let mut file_content = match std::fs::read_to_string(file_path.clone()) {
        Ok(content) => content,
        Err(e) => return Err(format!("Failed to read file: {}", e)),
    };

    // Parse the current content as a JSON array
    let mut array: Vec<serde_json::Value> = match serde_json::from_str(&file_content) {
        Ok(array) => array,
        Err(_) => vec![], // If parsing fails, assume the file was empty or not properly formatted and start with an empty array
    };

    array[id] = serde_json::json!({
        "vendor": vendor,
        "color": color,
        "type": type_,
        "price": price,
        "weight": weight,
    });

    // Convert the updated array back to a JSON string
    file_content = match serde_json::to_string(&array) {
        Ok(json_string) => json_string,
        Err(e) => return Err(format!("Failed to serialize JSON: {}", e)),
    };

    // Write the updated content back to the file
    match std::fs::write(file_path.clone(), file_content) {
        Ok(_) => Ok(format!("Successfully updated {}", file_path.clone())),
        Err(e) => Err(format!("Failed to write to file: {}", e)),
    }
}


#[tauri::command]
fn remove_filament(id: usize) -> Result<String, String> {
    // Specify the file path where you want to save the filament data
    let home_dir = std::env::var("HOME").expect("HOME environment variable not set");
    let config_dir = format!("{}/.config/3DprintCalc", home_dir);

    let file_path = format!("{}/filaments.json", config_dir);

    // Read the current contents of the file
    let mut file_content = match std::fs::read_to_string(file_path.clone()) {
        Ok(content) => content,
        Err(e) => return Err(format!("Failed to read file: {}", e)),
    };

    // Parse the current content as a JSON array
    let mut array: Vec<serde_json::Value> = match serde_json::from_str(&file_content) {
        Ok(array) => array,
        Err(_) => vec![], // If parsing fails, assume the file was empty or not properly formatted and start with an empty array
    };
    array.remove(id);

    // Convert the updated array back to a JSON string
    file_content = match serde_json::to_string(&array) {
        Ok(json_string) => json_string,
        Err(e) => return Err(format!("Failed to serialize JSON: {}", e)),
    };

    // Write the updated content back to the file
    match std::fs::write(file_path.clone(), file_content) {
        Ok(_) => Ok(format!("Successfully updated {}", file_path.clone())),
        Err(e) => Err(format!("Failed to write to file: {}", e)),
    }
}
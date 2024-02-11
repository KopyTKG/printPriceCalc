use std::fs::{self, File};
use std::io::{self, Write};
use std::path::Path;

fn main() {
    let _ = setup();

    // Proceed with Tauri application setup
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}



fn setup() -> io::Result<()> {
    let home_dir = std::env::var("HOME").expect("HOME environment variable not set");
    let config_dir = format!("{}/.config/3DprintCalc", home_dir);

    let filaments_path = format!("{}/filaments.json", config_dir);
    let example_path = format!("{}/filaments.example.json", config_dir);
    let vars_path = format!("{}/vars.json", config_dir);

    let path = Path::new(&config_dir);

    if path.exists() && path.is_dir() {
        println!("The directory already exists.");
    } else {
        if let Err(e) = fs::create_dir_all(&path) {
            eprintln!("Failed to create directory: {}", e);
            return Err(e); // Propagate the error
        }
        let mut filament_file = File::create(&filaments_path)?;
        filament_file.write_all(b"[]")?;

        let mut example_file = File::create(&example_path)?;
        example_file.write_all(b"[{\"vendor\": \"\",\"color\": \"\",\"type\": \"\",\"price\": 0,\"weight\": 0}]")?;

        let mut vars_file = File::create(&vars_path)?;
        vars_file.write_all(b"{\"Energy\": 0,\"Margin\": 0.00,\"PricePerHour\": 0,\"PostProcessing\": 0.00}")?;
    }

    Ok(()) // Explicitly return Ok(()) to indicate success
}

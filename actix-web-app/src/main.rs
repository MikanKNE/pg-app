use actix_files::Files;
use actix_web::{App, HttpServer, middleware::Logger};
use actix_cors::Cors;
use env_logger::Env;

mod config;
use config::CONFIG;

mod supabase_auth_service;
mod routes_auth;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    
    println!("🚀 Server running at http://0.0.0.0:{}", CONFIG.server_port);
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    HttpServer::new(|| {
        let cors = Cors::default()
            .allowed_origin("http://localhost:8080")
            .allowed_origin("http://localhost:3000")
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE", "OPTIONS"])
            .allow_any_header()
            .supports_credentials();
        App::new()
            .wrap(Logger::default())
            .wrap(cors)
            .configure(routes_auth::config)
            .service(Files::new("/", "./static").index_file("index.html"))
    })
    .bind(("0.0.0.0", CONFIG.server_port))?
    .run()
    .await
}

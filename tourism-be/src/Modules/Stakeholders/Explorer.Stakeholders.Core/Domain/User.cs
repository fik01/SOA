using Explorer.BuildingBlocks.Core.Domain;
using Explorer.Tours.API.Dtos;

namespace Explorer.Stakeholders.Core.Domain;

public class User : Entity
{
    public string Username { get; private set; }
    public string Password { get; private set; }
    public UserRole Role { get; private set; }
    public bool IsActive { get; set; }
    public string? ResetPasswordToken {  get; set; }
    public string? EmailVerificationToken { get; set; }

    public User(string username, string password, UserRole role, bool isActive, string? resetPasswordToken = "", string? emailVerificationToken = null)
    {
        Username = username;
        Password = password;
        Role = role;
        IsActive = isActive;
        Validate();
        ResetPasswordToken = resetPasswordToken;
        EmailVerificationToken = emailVerificationToken;
    }

    private void Validate()
    {
        if (string.IsNullOrWhiteSpace(Username)) throw new ArgumentException("Invalid Name");
        if (string.IsNullOrWhiteSpace(Password)) throw new ArgumentException("Invalid Surname");
    }

    public string GetPrimaryRoleName()
    {
        return Role.ToString().ToLower();
    }


    public void UpdatePassword(string password)
    {
        Password = password;
    }
    public void RemoveChangePasswordToken()
    {
        ResetPasswordToken = null;
    }
    public void RemoveEmailVerificationToken()
    {
        EmailVerificationToken = null;
    }
    public void ActivateUser()
    {
        IsActive = true;
    }
}

public enum UserRole
{
    Administrator,
    Author,
    Tourist
}